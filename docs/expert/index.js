import getAllExperts from "./getAllExperts.js";
import getExpertInfoById from "./getExpertInfoById.js";
import getCertificates from "./getCertificates.js";
import getCurrentExpertInfo from "./getCurrentExpertInfo.js";
import getMajorsByExpertId from "./getMajorsByExpertId.js";

export default {
  "/experts": {
    ...getAllExperts,
  },
  "/experts/current": {
    ...getCurrentExpertInfo,
  },
  "/experts/{expertId}": {
    ...getExpertInfoById,
  },
  "/experts/{expertId}/certificates": {
    ...getCertificates,
  },
  "/experts/{expertId}/majors": {
    ...getMajorsByExpertId,
  },
};
