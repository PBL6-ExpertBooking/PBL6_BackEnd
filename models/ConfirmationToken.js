import mongoose from "mongoose";

const confirmationTokenSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: "users" },
  token: String,
  confirm_at: Date,
  confirmation_sent_at: Date,
});

const ConfirmationToken = mongoose.model(
  "ConfirmationToken",
  confirmationTokenSchema
);
export default ConfirmationToken;
