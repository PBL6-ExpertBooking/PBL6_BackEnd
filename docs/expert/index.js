import getAllExperts from "./getAllExperts.js";
import getExpertInfo from "./getExpertInfo.js";
import verifyExpert from "./verifyExpert.js";

export default {
  "/expert/all": {
    ...getAllExperts,
  },
  "/expert/info/{expertId}": {
    ...getExpertInfo,
  },
  "/expert/verify/{expertId}": {
    ...verifyExpert,
  },
};
