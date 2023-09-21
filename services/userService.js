import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

const fetchUserById = async (user_id) => {
  const user = await User.findOne({ _id: user_id }).lean();
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  return user;
};

const changePasswordByUserId = async ({
  user_id,
  current_password,
  new_password,
  confirm_password,
}) => {
  if (new_password !== confirm_password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Confirmation password not match"
    );
  }

  const user = await User.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }

  let current_passwordMatches = await bcrypt.compare(
    current_password,
    user.encrypted_password
  );
  if (!current_passwordMatches) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid credentials");
  }

  const encrypted_new_password = await bcrypt.hash(
    new_password,
    parseInt(process.env.BCRYPT_SALT)
  );
  await user.updateOne({ encrypted_password: encrypted_new_password });

  return user;
};

export default { fetchUserById, changePasswordByUserId };
