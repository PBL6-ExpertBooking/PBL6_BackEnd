import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { userMapper } from "./mapper/userMapper.js";
import imageService from "./imageService.js";

const fetchUserById = async (user_id) => {
  const user = await User.findById(user_id).lean();
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  return userMapper(user);
};

const fetchUsersPagination = async (page = 1, limit = 10) => {
  const pagination = await User.paginate(
    {},
    {
      select:
        "first_name last_name gender phone address photo_url DoB email username role isRestricted",
      page,
      limit,
      lean: true,
      customeLabels: {
        docs: "users",
      },
    }
  );
  return pagination;
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
};

const updateUserInfo = async (user_id, update_info) => {
  const user = await User.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  user.first_name = update_info.first_name || user.first_name;
  user.last_name = update_info.last_name || user.last_name;
  user.gender = update_info.gender || user.gender;
  user.phone = update_info.phone || user.phone;
  user.address = update_info.address || user.address;
  if (update_info.file) {
    // upload image and retrieve photo_url
    const response = await imageService.uploadImage(update_info.file);
    if (user.photo_public_id) {
      // delete old image async
      imageService.deleteImageByPublicId(user.photo_public_id);
    }
    user.photo_url = response.url;
    user.photo_public_id = response.public_id;
  }
  user.DoB = update_info.DoB || user.DoB;
  await user.save();
  return userMapper(user);
};

export default {
  fetchUserById,
  fetchUsersPagination,
  changePasswordByUserId,
  updateUserInfo,
};
