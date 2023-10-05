import getAllExperts from "./getAllExperts.js";
import getExpertInfoById from "./getExpertInfoById.js";
import getCertificates from "./getCertificates.js";
import getCurrentExpertInfo from "./getCurrentExpertInfo.js";
import getMajorsByExpertId from "./getMajorsByExpertId.js";

export default {
  "/expert/all": {
    ...getAllExperts,
  },
  "/expert/info": {
    ...getCurrentExpertInfo,
  },
  "/expert/info/{expertId}": {
    ...getExpertInfoById,
  },
  "/expert/certificates/{expertId}": {
    ...getCertificates,
  },
  "/expert/majors/{expertId}": {
    ...getMajorsByExpertId,
  },
};
