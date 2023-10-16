import mongoose from "mongoose";
import { transaction_types, transaction_status } from "../config/constant.js";

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User", index: true },
    second_user: { type: mongoose.Schema.ObjectId, ref: "User" },
    booking: { type: mongoose.Schema.ObjectId, ref: "Booking" },
    amount: { type: Number, min: 0 },
    transaction_type: {
      type: String,
      enum: Object.values(transaction_types),
    },
    transaction_status: {
      type: String,
      enum: Object.values(transaction_status),
      default: transaction_status.PROCESSING,
      other_details: String,
    },
  },
  {
    collection: "transactions",
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
