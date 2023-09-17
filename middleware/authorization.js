import httpStatus from "http-status";
import { verifyAccessToken } from "../services/tokenService";
import ApiError from "../utils/APIError";

const auth = async (req, res, next) => {
  try {
    let authHeader = req.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid access token");
    }
    accessToken = authHeader.split(" ")[1];
    const user = await verifyAccessToken(accessToken);

    req.authData = user;

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
