import getUserInfo from "./getUserInfo.js";
import updateUserInfo from "./updateUserInfo.js";
import changePassword from "./changePassword.js";
import getAllUsers from "./getAllUsers.js";
import promoteToExpert from "./promoteToExpert.js";

export default {
  "/user/all": {
    ...getAllUsers,
  },
  "/user/info": {
    ...getUserInfo,
    ...updateUserInfo,
  },
  "/user/change-password": {
    ...changePassword,
  },
  "/user/promote-to-expert": {
    ...promoteToExpert,
  },
};
