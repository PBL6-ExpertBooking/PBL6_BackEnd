import userService from "../services/userService.js";

const getUserById = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const user = userService.fetchUserById(user_id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const user_id = req.authData.user._id;
    const { current_password, new_password, confirm_password } = req.body;
    await userService.changePasswordByUserId({
      user_id,
      current_password,
      new_password,
      confirm_password,
    });
    res.json({ message: "Changed password successfully" });
  } catch (error) {
    next(error);
  }
};

const getCurrentUserInfo = async (req, res, next) => {
  try {
    return req.authData.user;
  } catch (error) {
    next(error);
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const update_info = { ...req.body, file: req.file || undefined };
    const user_id = req.authData.user._id;
    const updated_user = await userService.updateUserInfo(user_id, update_info);
    res.json({ user: updated_user });
  } catch (error) {
    next(error);
  }
};

export default {
  getUserById,
  changePassword,
  getCurrentUserInfo,
  updateUserInfo,
};
