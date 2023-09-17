import { User } from "../models/index.js";
import httpStatus from "http-status";
import ApiError from "../utils/APIError.js";
import bcrypt from "bcryptjs";

const createNewUser = async (user) => {
  if (await User.findOne({ email: user.email.toLowerCase() })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists.");
  }
  if (await User.findOne({ username: user.username.toLowerCase() })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already exists.");
  }
  const encrypted_password = await bcrypt.hash(user.password, 10);
  const newUser = await User.create({ ...user, encrypted_password });
  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Server error");
  }
  return newUser;
};

export { createNewUser };
