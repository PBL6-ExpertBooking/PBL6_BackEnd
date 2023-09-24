import { User } from "../models/index.js";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import { userMapper } from "./mapper/userMapper.js";

const createNewUser = async (user) => {
  if (await User.findOne({ email: user.email.toLowerCase() })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists.");
  }
  if (await User.findOne({ username: user.username.toLowerCase() })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already exists.");
  }
  const encrypted_password = await bcrypt.hash(
    user.password,
    parseInt(process.env.BCRYPT_SALT)
  );
  const newUser = await User.create({ ...user, encrypted_password });
  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Server error");
  }
  return userMapper(newUser);
};

const fetchUserByUsernameAndPassword = async ({ username, password }) => {
  const user = await User.findOne({
    username: username,
  }).lean();
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid credentials");
  }

  let passwordMatches = await bcrypt.compare(password, user.encrypted_password);
  if (!passwordMatches) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid credentials");
  }
  return userMapper(user);
};

const fetchUserByEmail = async ({ email }) => {
  const user = await User.findOne({
    email: email.toLowerCase(),
  }).lean();
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid credentials");
  }

  return userMapper(user);
};

const verifyUserFromTokenPayload = async ({ user_id }) => {
  if (!(await User.exists({ _id: user_id }))) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid token");
  }
};

const enableUserById = async (user_id) => {
  const user = await User.findByIdAndUpdate(user_id, { isRestricted: false });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
};

export default {
  createNewUser,
  fetchUserByUsernameAndPassword,
  fetchUserByEmail,
  verifyUserFromTokenPayload,
  enableUserById,
};
