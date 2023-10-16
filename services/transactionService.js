import { Transaction, User } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { transaction_status, transaction_types } from "../config/constant";

const createTransaction = async ({
  user_id,
  amount,
  transaction_type,
  second_user_id,
}) => {
  if (!(await User.exists({ _id: user_id }))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }

  if (!Number.isInteger(amount) || amount <= 0) {
    throw new ApiError(httpStatus.BAD_GATEWAY, "Invalid amount");
  }

  let obj = {
    user: user_id,
    amount: amount,
    transaction_type,
    transaction_status: transaction_status.PROCESSING,
  };

  if (transaction_type === transaction_types.TRANSFER) {
    if (!(await User.exists({ _id: second_user_id }))) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Second user not found");
    }
    obj.second_user = second_user_id;
  }

  const transaction = await Transaction.create(obj);

  return transaction;
};

const deposit = async ({ user_id, amount }) => {
  const transaction = await createTransaction({
    user_id,
    amount,
    transaction_type: transaction_types.DEPOSIT,
  });
  return transaction;
};

const withdrawal = async ({ user_id, amount }) => {
  const transaction = await createTransaction({
    user_id,
    amount,
    transaction_type: transaction_types.WITHDRAWAL,
  });
  return transaction;
};

const transfer = async ({ user_id, second_user_id, amount }) => {
  const transaction = await createTransaction({
    user_id,
    amount,
    transaction_type: transaction_types.TRANSFER,
    second_user_id,
  });
  return transaction;
};

export default {
  deposit,
  withdrawal,
  transfer,
};
