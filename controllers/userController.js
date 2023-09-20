import { changePasswordByUserId } from "../services/userService.js";

const changePassword = async (req, res, next) => {
  try {
    const { user } = req.authData;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    await changePasswordByUserId({
      userId: user._id,
      oldPassword,
      newPassword,
      confirmPassword,
    });
    res.json({ message: "Changed password successfully" });
  } catch (error) {
    next(error);
  }
};

export default { changePassword };
