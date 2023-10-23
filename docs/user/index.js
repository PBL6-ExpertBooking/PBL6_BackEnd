import getCurrentUserInfo from "./getCurrentUserInfo.js";
import updateUserInfo from "./updateUserInfo.js";
import changePassword from "./changePassword.js";
import getAllUsers from "./getAllUsers.js";
import promoteToExpert from "./promoteToExpert.js";
import getUserInfoById from "./getUserInfoById.js";
import enableUser from "./enableUser.js";
import disableUser from "./disableUser.js";
import updateUserInfoById from "./updateUserInfoById.js";
import deleteUser from "./deleteUser.js";

export default {
  "/users": {
    ...getAllUsers,
  },
  "/users/current": {
    ...getCurrentUserInfo,
    ...updateUserInfo,
  },
  "/users/current/password": {
    ...changePassword,
  },
  "/users/current/promote-to-expert": {
    ...promoteToExpert,
  },
  "/users/{user_id}": {
    ...getUserInfoById,
    ...updateUserInfoById,
    ...deleteUser,
  },
  "/users/{user_id}/enable": {
    ...enableUser,
  },
  "/users/{user_id}/disable": {
    ...disableUser,
  },
};
