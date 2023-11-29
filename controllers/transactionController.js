import transactionService from "../services/transactionService.js";
import pusher from "../utils/pusher.js";

const createDeposit = async (req, res, next) => {
  try {
    const user_id = req.authData.user._id;
    const { amount } = req.body;
    const transaction = await transactionService.createDeposit({
      user_id,
      amount,
    });

    let ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    const paymentUrl = transactionService.generatePaymentUrl({
      ipAddr,
      transaction_id: transaction._id,
      amount: transaction.amount,
    });
    res.json({ transaction, paymentUrl });
  } catch (error) {
    next(error);
  }
};

const vnpayReturn = async (req, res, next) => {
  try {
    res.json(await transactionService.handleVnpayReturn(req));
  } catch (error) {
    next(error);
  }
};

const vnpayIpn = async (req, res, next) => {
  try {
    await transactionService.vnpayIpn(req, res);
  } catch (error) {
    next(error);
  }
};

const createPayment = async (req, res, next) => {
  try {
    const user_id = req.authData.user._id;
    const { job_request_id } = req.body;
    const transaction = await transactionService.createPayment({
      user_id,
      job_request_id,
    });
    res.json({ transaction });
  } catch (error) {
    next(error);
  }
};

const executePayment = async (req, res, next) => {
  try {
    const user_id = req.authData.user._id;
    const { transaction_id } = req.params;
    const transaction = await transactionService.executePayment({
      user_id,
      transaction_id,
    });

    pusher.trigger(`user-${transaction.user._id}`, "update_balance", {
      balance: transaction.user.balance,
    });

    pusher.trigger(`user-${transaction.expert._id}`, "update_balance", {
      balance: transaction.expert.balance,
    });

    res.json({ transaction });
  } catch (error) {
    next(error);
  }
};

export default {
  createDeposit,
  vnpayReturn,
  vnpayIpn,
  createPayment,
  executePayment,
};
