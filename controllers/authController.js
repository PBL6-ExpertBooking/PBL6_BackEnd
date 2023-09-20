import {
  createNewUser,
  fetchUserByUsernameAndPassword,
  verifyUserFromTokenPayload,
} from "../services/authService.js";
import {
  clearRefreshToken,
  generateAccessTokenFromRefreshTokenPayload,
  generateAuthTokens,
  verifyRefreshToken,
} from "../services/tokenService.js";
import {
  createConfirmationTokenAndSendMail,
  enableUserByConfirmationToken,
} from "../services/confirmationUserService.js";

const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, username, password } = req.body;
    const newUser = await createNewUser({
      first_name,
      last_name,
      email,
      username,
      password,
    });
    createConfirmationTokenAndSendMail(newUser._id);
    const tokens = await generateAuthTokens(newUser);
    res.json({
      user: {
        _id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
      },
      tokens,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await fetchUserByUsernameAndPassword({ username, password });
    const tokens = await generateAuthTokens(user);
    res.json({
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        photo_url: user.photo_url,
        role: user.role,
      },
      tokens,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    await clearRefreshToken(refreshToken);
    res.json({});
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const payload = await verifyRefreshToken(refreshToken);
    await verifyUserFromTokenPayload(payload);
    let newAccessToken = await generateAccessTokenFromRefreshTokenPayload(
      payload
    );
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

const activate = async (req, res, next) => {
  try {
    const token = req.params.token;
    await enableUserByConfirmationToken(token);
    res.json({ message: "Activated account" });
  } catch (error) {
    next(error);
  }
};

export default { register, login, logout, refreshToken, activate };
