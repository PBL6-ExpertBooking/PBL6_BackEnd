import { Transaction, User, Booking } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { transaction_status, transaction_types } from "../config/constant";

const createTransaction = async ({
  user_id,
  amount,
  transaction_type,
  booking_id,
}) => {
  const user = await User.findById(user_id).lean();
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }

  if (!Number.isInteger(amount) || amount <= 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid amount");
  }

  if (amount < user.balance) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient balance");
  }

  let obj = {
    user: user_id,
    amount: amount,
    transaction_type,
    transaction_status: transaction_status.PROCESSING,
  };

  if (transaction_type === transaction_types.PAYMENT) {
    obj.second_user = obj.booking = booking_id;
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
    transaction_type: transaction_types.TRANSFER,
    booking_id: booking._id,
    second_user_id: booking.expert.user.toString(),
  });

  return transaction;
};

const transactionHandler = async (transaction_id, bankHandler) => {
  const transaction = await Transaction.findById(transaction_id).lean();
  if (!transaction) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction not found");
  }
  if (
    transaction.transaction_type === transaction_types.DEPOSIT ||
    transaction.transaction_type === transaction_types.WITHDRAWAL
  ) {
    //
    //await bankHandler(transaction);
    //
  }
  if (transaction.transaction_type === transaction_types.PAYMENT) {
    await handleTransfer(transaction);
  }
};

const handleTransfer = async (transaction) => {
  const user = await User.findById(transaction.user);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }

  const second_user = await User.findById(transaction.second_user);
  if (!second_user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }

  if (transaction.amount < user.balance) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient balance");
  }

  // calculate commission here
  commission = (transaction.amount * 0) / 100;
  user.balance = user.balance - transaction.amount;
  second_user.balance = second_user.balance + transaction.amount - commission;
  //

  await Transaction.create({
    user: second_user,
    second_user: user,
    booking: transaction.booking,
    amount: transaction.amount - commission,
    transaction_type: transaction_types.RECEIPT,
    transaction_status: transaction_status.DONE,
  });
  await Transaction.updateOne(
    { _id: transaction._id },
    { transaction_status: transaction_status.DONE }
  );
  await user.save();
  await second_user.save();
};

export default {
  createDeposit,
  createWithdrawal,
  createPayment,
  transactionHandler,
};
