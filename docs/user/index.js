import getCurrentUserInfo from "./getCurrentUserInfo.js";
import updateUserInfo from "./updateUserInfo.js";
import changePassword from "./changePassword.js";
import getAllUsers from "./getAllUsers.js";
import promoteToExpert from "./promoteToExpert.js";
import getUserInfoById from "./getUserInfoById.js";

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
  },
  "/user/change-password": {
    ...changePassword,
  },
  "/user/promote-to-expert": {
    ...promoteToExpert,
  },
};
