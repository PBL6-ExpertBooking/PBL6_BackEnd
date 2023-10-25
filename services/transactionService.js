import { Transaction, User, Booking } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { transaction_status, transaction_types } from "../config/constant.js";
import querystring from "qs";
import crypto from "crypto";
import moment from "moment";
import dotenv from "dotenv";
import { startSession } from "mongoose";

dotenv.config();

const createTransaction = async ({
  user_id,
  amount,
  transaction_type,
  booking_id,
  expert_user_id,
}) => {
  const user = await User.findById(user_id).lean();
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }

  if (!Number.isInteger(amount) || amount <= 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid amount");
  }

  if (
    (transaction_type === transaction_types.WITHDRAWAL ||
      transaction_type === transaction_types.PAYMENT) &&
    amount < user.balance
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient balance");
  }

  let obj = {
    user: user_id,
    amount: amount,
    transaction_type,
    transaction_status: transaction_status.PROCESSING,
  };

  if (transaction_type === transaction_types.PAYMENT) {
    obj.booking = booking_id;
    obj.expert = expert_user_id;
  }

  const transaction = await Transaction.create(obj);

  return transaction;
};

const createDeposit = async ({ user_id, amount }) => {
  const transaction = await createTransaction({
    user_id,
    amount,
    transaction_type: transaction_types.DEPOSIT,
  });
  return transaction;
};

const createWithdrawal = async ({ user_id, amount }) => {
  const transaction = await createTransaction({
    user_id,
    amount,
    transaction_type: transaction_types.WITHDRAWAL,
  });
  return transaction;
};

const createPayment = async ({ user_id, booking_id, amount }) => {
  const booking = await Booking.findById(booking_id)
    .populate([
      {
        path: "expert",
      },
      {
        path: "job_request",
      },
    ])
    .lean();

  if (!booking) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Booking not found");
  }

  if (booking.job_request.user.toString() != user_id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid payment");
  }

  const transaction = await createTransaction({
    user_id: user_id,
    amount: amount,
    transaction_type: transaction_types.PAYMENT,
    booking_id: booking._id,
    expert_user_id: booking.expert.user.toString(),
  });

  return transaction;
};

const transactionHandler = async (transaction_id) => {
  const transaction = await Transaction.findById(transaction_id).lean();
  if (!transaction) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction not found");
  }
  if (transaction.transaction_status === transaction_status.DONE) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction was done");
  }
  if (transaction.transaction_status === transaction_status.CANCELED) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction was canceled");
  }

  switch (transaction.transaction_type) {
    case transaction_types.DEPOSIT: {
      await handleSuccessDeposit(transaction);
      break;
    }
    case transaction_types.WITHDRAWAL: {
      await handleWithdrawal(transaction);
      break;
    }
    case transaction_types.PAYMENT: {
      await handlePayment(transaction);
      break;
    }
  }
};

const handleSuccessDeposit = async (transaction) => {
  const user = await User.findById(transaction.user);
  if (!user) return;
  if (transaction.transaction_status !== transaction_status.DONE) return;
  await user.updateOne({
    balance: user.balance + transaction.amount,
  });
};

const handleWithdrawal = async (transaction) => {
  const user = await User.findById(transaction.user);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  if (transaction.amount < user.balance) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient balance");
  }
  try {
    // call bank handler
    await user.updateOne({
      balance: user.balance - transaction.amount,
    });
    await Transaction.updateOne(
      { _id: transaction._id },
      {
        transaction_status: transaction_status.DONE,
      }
    );
  } catch (error) {}
};

const handlePayment = async (transaction) => {
  const session = await startSession();
  try {
    // start transaction
    session.startTransaction();
    const user = await User.findByIdAndUpdate(
      transaction.user,
      {
        $inc: { balance: -transaction.amount },
      },
      {
        session,
        new: true,
      }
    );

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
    }
    if (user.balance < 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient balance");
    }

    const expert = await User.findByIdAndUpdate(
      transaction.user,
      {
        $inc: { balance: transaction.amount },
      },
      {
        session,
        new: true,
      }
    );
    if (!expert) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
    }

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const fetchTransactionsByUserId = async (user_id) => {
  const transactions = await Transaction.find({ user: user_id });
  return transactions;
};

const generatePaymentUrl = ({
  ipAddr,
  transaction_id,
  amount,
  bankCode = null,
  language = null,
}) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";
  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let tmnCode = process.env.vnp_TmnCode;
  let secretKey = process.env.vnp_HashSecret;
  let vnpUrl = process.env.vnp_Url;
  let returnUrl = process.env.vnp_ReturnUrl;

  let locale = language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = transaction_id;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + transaction_id;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  return vnpUrl;
};

const handleVnpayReturn = async (req) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  let tmnCode = process.env.vnp_TmnCode;
  let secretKey = process.env.vnp_HashSecret;

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    let transaction_id = vnp_Params["vnp_TxnRef"];
    let amount = vnp_Params["vnp_Amount"] / 100;
    const transaction = await Transaction.findById(transaction_id);
    if (!transaction) {
      return { message: "Transaction not found" };
    }
    if (amount != transaction.amount) {
      return { message: "Amount not match" };
    }
    if (!(transaction.transaction_status == transaction_status.PROCESSING)) {
      return { message: "Transaction was done or canceled" };
    }
    // test
    transaction.transaction_status = transaction_status.DONE;
    await transaction.save();
    await handleSuccessDeposit(transaction);
    //
    return { message: "Transaction successful" };
  }

  return { message: "Error" };
};

const vnpayIpn = async (req, res) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];

  let transaction_id = vnp_Params["vnp_TxnRef"];
  let amount = vnp_Params["vnp_Amount"] / 100;
  let rspCode = vnp_Params["vnp_ResponseCode"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  let secretKey = process.env.vnp_HashSecret;
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  const transaction = await Transaction.findById(transaction_id).lean();

  let paymentStatus = "0"; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
  //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
  //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

  let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
  let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
  if (secureHash === signed) {
    //kiểm tra checksum
    if (transaction) {
      if (transaction.amount === amount) {
        if (transaction.transaction_status === transaction_status.PROCESSING) {
          //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
          if (rspCode == "00") {
            //thanh cong
            //paymentStatus = '1'
            // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
            transaction.transaction_status = transaction_status.DONE;
            await transaction.save();
            await handleSuccessDeposit(transaction);
            res.status(200).json({ RspCode: "00", Message: "Success" });
          } else {
            //that bai
            //paymentStatus = '2'
            // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
            transaction.transaction_status = transaction_status.CANCELED;
            await transaction.save();
            res.status(200).json({ RspCode: "00", Message: "Success" });
          }
        } else {
          res.status(200).json({
            RspCode: "02",
            Message: "This order has been updated to the payment status",
          });
        }
      } else {
        res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
      }
    } else {
      res.status(200).json({ RspCode: "01", Message: "Order not found" });
    }
  } else {
    res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
  }
};

const sortObject = (obj) => {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
};

export default {
  createDeposit,
  createWithdrawal,
  createPayment,
  transactionHandler,
  fetchTransactionsByUserId,
  generatePaymentUrl,
  handleVnpayReturn,
  vnpayIpn,
};
