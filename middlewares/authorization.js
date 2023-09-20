import httpStatus from "http-status";
import { verifyAccessToken } from "../services/tokenService.js";
import ApiError from "../utils/ApiError.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid access token");
    }
    const accessToken = authHeader.split(" ")[1];
    const user = await verifyAccessToken(accessToken);

    if (user.isRestricted) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Restricted user");
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
