import pushTokenService from "../services/pushTokenService.js";

const saveToken = (req, res, next) => {
  try {
    const { token, role } = req.body;
    pushTokenService.saveToken({ token, role });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export default {
  saveToken,
};
