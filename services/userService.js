import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

const fetchUserById = async (userId) => {
  const user = await User.findOne({ _id: userId }).lean();
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  return user;
};

const changePasswordByUserId = async ({
  userId,
  oldPassword,
  newPassword,
  confirmPassword,
}) => {
  if (newPassword !== confirmPassword) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Confirmation password not match"
    );
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }

  let oldPasswordMatches = await bcrypt.compare(
    oldPassword,
    user.encrypted_password
  );
  if (!oldPasswordMatches) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid credentials");
  }

  const encrypted_newPassword = await bcrypt.hash(
    newPassword,
    parseInt(process.env.BCRYPT_SALT)
  );
  await user.updateOne({ encrypted_password: encrypted_newPassword });

  return user;
};

export { fetchUserById, changePasswordByUserId };
