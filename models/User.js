import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    gender: Boolean,
    phone: String,
    address: String,
    photo_url: String,
    DoB: Date,
    email: String,
    username: String,
    encrypted_password: String,
    reset_password: String,
    role: { type: String, default: "USER" },
    isRestricted: { type: Boolean, default: false },
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

export default User;
