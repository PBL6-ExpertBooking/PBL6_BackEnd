import getUserInfo from "./getUserInfo.js";
import updateUserInfo from "./updateUserInfo.js";
import changePassword from "./changePassword.js";

export default {
  "/user/info": {
    ...getUserInfo,
    ...updateUserInfo,
  },
  "/user/change-password": {
    ...changePassword,
  },
};
