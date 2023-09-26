import authService from "../services/authService.js";
import tokenService from "../services/tokenService.js";
import confirmationUserService from "../services/confirmationUserService.js";

const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, username, password } = req.body;
    const newUser = await authService.createNewUser({
      first_name,
      last_name,
      email,
      username,
      password,
    });
    confirmationUserService.createConfirmationTokenAndSendMail(newUser._id);
    const tokens = await tokenService.generateAuthTokens(newUser);
    res.json({
      user: newUser,
      tokens,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await authService.fetchUserByUsernameAndPassword({
      username,
      password,
    });
    const tokens = await tokenService.generateAuthTokens(user);
    res.json({
      user,
      tokens,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    await tokenService.clearRefreshToken(refresh_token);
    res.json({});
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    const payload = await tokenService.verifyRefreshToken(refresh_token);
    await authService.verifyUserFromTokenPayload(payload);
    let newAccessToken =
      await tokenService.generateAccessTokenFromRefreshTokenPayload(payload);
    res.json({ access_token: newAccessToken });
  } catch (error) {
    next(error);
  }
};

const activate = async (req, res, next) => {
  try {
    const token = req.params.token;
    await confirmationUserService.enableUserByConfirmationToken(token);
    res.json({ message: "Activated account" });
  } catch (error) {
    next(error);
  }
};

export default { register, login, logout, refreshToken, activate };
