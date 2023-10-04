import authService from "../services/authService.js";
import tokenService from "../services/tokenService.js";
import confirmationUserService from "../services/confirmationUserService.js";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

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

// Google auth

const redirectUrl = `${process.env.DOMAIN_NAME}/v1/auth/google`;
let redirectUrlAfterVerify = "";
const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  redirectUrl
);

const googleUserLogin = async (req, res, next) => {
  try {
    redirectUrlAfterVerify = req.body.redirectUrl;
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: "https://www.googleapis.com/auth/userinfo.profile email openid",
      prompt: "consent",
    });
    res.json({ url: authorizeUrl });
  } catch (error) {
    next(error);
  }
};

async function getUserData(access_token) {
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  return await response.data;
}

const googleUserVerify = async (req, res, next) => {
  try {
    const code = req.query.code;
    const r = await oAuth2Client.getToken(code);
    const google_user = await getUserData(r.tokens.access_token);
    const user = await authService.handleGoogleUser(google_user);
    const tokens = await tokenService.generateAuthTokens(user);

    // store authData in cookie
    res.cookie("authData", JSON.stringify({ user, tokens }), { maxAge: 60000 });
    if (redirectUrlAfterVerify) {
      res.redirect(303, redirectUrlAfterVerify);
    } else {
      res.json({ user, tokens });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default {
  register,
  login,
  logout,
  refreshToken,
  activate,
  googleUserLogin,
  googleUserVerify,
};
