import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";
import { roles } from "../config/constant.js";

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    gender: Boolean,
    phone: String,
    address: {
      type: {
        city: {
          name: String,
          code: Number,
        },
        district: {
          name: String,
          code: Number,
        },
        ward: {
          name: String,
          code: Number,
        },
        other_detail: String,
      },
      default: {
        city: {
          name: "",
          code: 0,
        },
        district: {
          name: "",
          code: 0,
        },
        ward: {
          name: "",
          code: 0,
        },
        other_detail: "",
      },
    },
    photo_url: String,
    photo_public_id: String,
    DoB: Date,
    email: { type: String, required: true, index: true },
    username: { type: String, index: true },
    encrypted_password: String,
    reset_password: String,
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.USER,
    },
    isRestricted: { type: Boolean, default: false },
    isConfirmed: { type: Boolean, default: false },
    providers: { type: [String], default: [] },
    balance: { type: Number, min: 0, default: 0 },
    lastLoginTime: { type: Date, default: () => Date.now() },
  },
  { collection: "users" }
);

userSchema.plugin(mongoosePaginate);
userSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const User = mongoose.model("User", userSchema);

export default User;
