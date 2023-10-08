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
  "/users": {
    ...getAllUsers,
  },
  "/users/current": {
    ...getCurrentUserInfo,
    ...updateUserInfo,
  },
  "/users/{userId}": {
    ...getUserInfoById,
    ...updateUserInfoById,
  },
  "/users/password": {
    ...changePassword,
  },
  "/users/promote-to-expert": {
    ...promoteToExpert,
  },
  "/users/enable/{userId}": {
    ...enableUser,
  },
  "/users/disable/{userId}": {
    ...disableUser,
  },
};
