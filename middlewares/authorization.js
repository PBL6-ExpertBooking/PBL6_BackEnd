import httpStatus from "http-status";
import tokenService from "../services/tokenService.js";
import ApiError from "../utils/ApiError.js";

const auth = async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;
    let user;
    try {
      user = await tokenService.verifyAccessToken(access_token);
    } catch (error) {
      const refresh_token = req.cookies.refresh_token;
      const payload = await tokenService.verifyRefreshToken(refresh_token);
      await authService.verifyUserFromTokenPayload(payload);
      let newAccessToken =
        await tokenService.generateAccessTokenFromRefreshTokenPayload(payload);
      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        maxAge: process.env.ACCESS_TOKEN_EXPIRATION_MINUTES * 60 * 1000,
      });
      user = await tokenService.verifyAccessToken(newAccessToken);
    }

    if (!user.isConfirmed) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        "Your email is not confirmed"
      );
    }

    if (user.isRestricted) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Restricted user");
    }

    req.authData = { user };

    next();
  } catch (error) {
    next(error);
  }
};

const checkRole = (roles) => async (req, res, next) => {
  try {
    const { user } = req.authData;
    if (!roles.includes(user.role)) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Not have access to this route"
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { auth, checkRole };
