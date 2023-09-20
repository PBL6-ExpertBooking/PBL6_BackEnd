import { sign, verify } from "../utils/jwtHelper.js";
import { RefreshToken, User } from "../models/index.js";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import moment from "moment/moment.js";
import { tokenTypes } from "../config/constant.js";
import { fetchUserById } from "./userService.js";

const generateToken = async (userId, loginTime, exp, type) => {
  const payload = {
    userId,
    loginTime: new Date(loginTime.valueOf()),
    exp: exp.unix(),
    type,
  };
  let token = await sign(payload, process.env.JWT_SECRET);
  return token;
};

const saveRefreshToken = async (userId, loginTime, token) => {
  await RefreshToken.findOneAndUpdate(
    { user_id: userId },
    {
      login_time: new Date(loginTime.valueOf()),
      token: token,
    },
    {
      upsert: true,
    }
  );
};

const clearRefreshToken = async (token) => {
  await RefreshToken.findOneAndDelete({ token: token });
};

const generateAuthTokens = async (user) => {
  const loginTime = moment();
  let accessTokenExpiresAt = loginTime
    .clone()
    .add(process.env.ACCESS_TOKEN_EXPIRATION_MINUTES, "minutes");

  const accessToken = await generateToken(
    user._id,
    loginTime,
    accessTokenExpiresAt,
    tokenTypes.ACCESS
  );

  let refreshTokenExpireAt = loginTime
    .clone()
    .add(process.env.REFRESH_TOKEN_EXPIRATION_DAYS, "days");

  const refreshToken = await generateToken(
    user._id,
    loginTime,
    refreshTokenExpireAt,
    tokenTypes.REFRESH
  );

  await saveRefreshToken(user._id, loginTime, refreshToken);
  return {
    accessToken,
    refreshToken,
  };
};

const generateAccessTokenFromRefreshTokenPayload = async ({
  userId,
  loginTime,
}) => {
  const now = moment();
  let accessTokenExpiresAt = now
    .clone()
    .add(process.env.ACCESS_TOKEN_EXPIRATION_MINUTES, "minutes");

  const accessToken = await generateToken(
    userId,
    moment(loginTime),
    accessTokenExpiresAt,
    tokenTypes.ACCESS
  );

  return accessToken;
};

const verifyRefreshToken = async (token) => {
  let tokenPayload = await verify(token, process.env.JWT_SECRET);
  if (!tokenPayload || tokenPayload.type != tokenTypes.REFRESH) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }

  if (!(await RefreshToken.exists({ token: token }))) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }

  return tokenPayload;
};

const verifyAccessToken = async (token) => {
  let tokenPayload = await verify(token, process.env.JWT_SECRET);
  if (!tokenPayload || tokenPayload.type != tokenTypes.ACCESS) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid access token");
  }

  const user = await fetchUserById(tokenPayload.userId);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid access token");
  }

  let refreshTokenExists = await RefreshToken.exists({
    user_id: user._id,
    login_time: tokenPayload.login_time,
  });
  if (!refreshTokenExists) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid access token");
  }

  return user;
};

export {
  clearRefreshToken,
  generateAuthTokens,
  generateAccessTokenFromRefreshTokenPayload,
  verifyRefreshToken,
  verifyAccessToken,
};
