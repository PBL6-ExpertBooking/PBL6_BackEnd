import login from "./login.js";
import register from "./register.js";
import logout from "./logout.js";
import refreshToken from "./refreshToken.js";
import activate from "./activate.js";
import googleLogin from "./googleLogin.js";

export default {
  "/auth/register": {
    ...register,
  },
  "/auth/login": {
    ...login,
  },
  "/auth/logout": {
    ...logout,
  },
  "/auth/refresh-token": {
    ...refreshToken,
  },
  "/auth/activate/{token}": {
    ...activate,
  },
  "/auth/google-user": {
    ...googleLogin,
  },
};
