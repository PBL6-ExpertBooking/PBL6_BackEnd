import getCurrentUserInfo from "./getCurrentUserInfo.js";
import updateUserInfo from "./updateUserInfo.js";
import changePassword from "./changePassword.js";
import getAllUsers from "./getAllUsers.js";
import promoteToExpert from "./promoteToExpert.js";
import getUserInfoById from "./getUserInfoById.js";
import enableUser from "./enableUser.js";
import disableUser from "./disableUser.js";
import updateUserInfoById from "./updateUserInfoById.js";

export default {
  "/user/all": {
    ...getAllUsers,
  },
  "/user/info": {
    ...getCurrentUserInfo,
    ...updateUserInfo,
  },
  "/user/info/{userId}": {
    ...getUserInfoById,
    ...updateUserInfoById,
  },
  "/user/change-password": {
    ...changePassword,
  },
  "/user/promote-to-expert": {
    ...promoteToExpert,
  },
  "/user/enable/{userId}": {
    ...enableUser,
  },
  "/user/disable/{userId}": {
    ...disableUser,
  },
};
