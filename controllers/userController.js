import userService from "../services/userService.js";

const changePassword = async (req, res, next) => {
  try {
    const { user } = req.authData;
    const { current_password, new_password, confirm_password } = req.body;
    await userService.changePasswordByUserId({
      user_id: user._id,
      current_password,
      new_password,
      confirm_password,
    });
    res.json({ message: "Changed password successfully" });
  } catch (error) {
    next(error);
  }
};

export default { changePassword };
