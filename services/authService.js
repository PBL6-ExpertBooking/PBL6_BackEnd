import { User } from "../models/index.js";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcryptjs";

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
  return newUser;
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
  return user;
};

const fetchUserByEmail = async ({ email }) => {
  const user = await User.findOne({
    email: email.toLowerCase(),
  }).lean();
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid credentials");
  }

  return user;
};

const verifyUserFromTokenPayload = async ({ userId }) => {
  if (!(await User.exists({ _id: userId }))) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid token");
  }
};

const enableUserById = async (userId) => {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { isRestricted: false }
  );
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
};

export {
  createNewUser,
  fetchUserByUsernameAndPassword,
  fetchUserByEmail,
  verifyUserFromTokenPayload,
  enableUserById,
};
