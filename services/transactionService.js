import { Transaction, User, Booking } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { transaction_status, transaction_types } from "../config/constant";

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

const transactionHandler = async (transaction_id, bankHandler) => {
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
      await handleDeposit(transaction);
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

const handleDeposit = async (transaction) => {
  const user = await User.findById(transaction.user);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  try {
    // call bank handler
    await user.updateOne({
      balance: user.balance + transaction.amount,
    });
    await Transaction.updateOne(
      { _id: transaction._id },
      {
        transaction_status: transaction_status.DONE,
      }
    );
  } catch (error) {}
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
  const user = await User.findById(transaction.user);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }

  const expert = await User.findById(transaction.expert);
  if (!expert) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
  }

  if (transaction.amount < user.balance) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient balance");
  }

  // calculate commission here
  commission = (transaction.amount * 0) / 100;
  user.balance = user.balance - transaction.amount;
  expert.balance = second_user.balance + transaction.amount - commission;
  //

  await Transaction.updateOne(
    { _id: transaction._id },
    { transaction_status: transaction_status.DONE }
  );
  await user.save();
  await expert.save();
};

const fetchTransactionsByUserId = async (user_id) => {
  const transactions = await Transaction.find({ user: user_id });
  return transactions;
};

export default {
  createDeposit,
  createWithdrawal,
  createPayment,
  transactionHandler,
  fetchTransactionsByUserId,
};
