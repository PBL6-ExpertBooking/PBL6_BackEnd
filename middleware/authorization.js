import httpStatus from "http-status";
import { verifyAccessToken } from "../services/tokenService";
import ApiError from "../utils/APIError";

const authenticate = async (req, res, next) => {
  try {
    let accessToken = req.get("Authorization");
    if (!accessToken || !accessToken.startsWith("Bearer ")) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid access token");
    }
    accessToken = accessToken.split(" ")[1];
    const user = await verifyAccessToken(accessToken);

    req.authData = user;

    next();
  } catch (error) {
    next(error);
  }
};

const isExpert = async (req, res, next) => {
  try {
    const { user } = req.authData;
    if (user.role != "EXPERT") {
      throw new ApiError(httpStatus.UNAUTHORIZED, "unauthorized");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { authenticate, isExpert };
