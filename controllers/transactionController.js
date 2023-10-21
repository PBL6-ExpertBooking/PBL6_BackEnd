import transactionService from "../services/transactionService.js";

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

const getCurrentUserTransactions = async (req, res, next) => {
  try {
    const user_id = req.authData.user._id;
    const transactions = await transactionService.fetchTransactionsByUserId(
      user_id
    );
    res.json({ transactions });
  } catch (error) {
    next(error);
  }
};

export default {
  createDeposit,
  getCurrentUserTransactions,
  vnpayReturn,
};
