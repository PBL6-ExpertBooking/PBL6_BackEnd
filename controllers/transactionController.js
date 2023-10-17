import transactionService from "../services/transactionService.js";

const createDeposit = async (req, res, next) => {
  try {
    const user_id = req.authData.user._id;
    const { amount } = req.body;
    const transaction = await transactionService.createDeposit({
      user_id,
      amount,
    });
    res.json({ transaction });
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
};
