import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    phone: String,
    encrypted_password: String,
    reset_password_token: String,
    reset_passwotd_sent_at: Date,
  },
  { collection: "admins" }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
