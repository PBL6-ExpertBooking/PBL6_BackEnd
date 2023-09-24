import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { roles } from "../config/constant.js";

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    gender: Boolean,
    phone: String,
    address: String,
    photo_url: String,
    photo_public_id: String,
    DoB: Date,
    email: { type: String, required: true },
    username: String,
    encrypted_password: String,
    reset_password: String,
    role: {
      type: String,
      enum: [roles.USER, roles.EXPERT],
      default: roles.USER,
    },
    isRestricted: { type: Boolean, default: true },
  },
  { collection: "users" }
);

userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema);

export default User;
