import getAllExperts from "./getAllExperts.js";
import getExpertInfoById from "./getExpertInfoById.js";
import getCertificates from "./getCertificates.js";
import getCurrentExpertInfo from "./getCurrentExpertInfo.js";
import getMajorsByExpertId from "./getMajorsByExpertId.js";
import getReviewsByExpertId from "./getReviewsByExpertId.js";
import getBookingsByExpertId from "./getBookingsByExpertId.js";
import getUnverifiedExpert from "./getUnverifiedExpert.js";

export default {
  "/experts": {
    ...getAllExperts,
  },
  "/experts/unverified": {
    ...getUnverifiedExpert,
  },
  "/experts/current": {
    ...getCurrentExpertInfo,
  },
  "/experts/{expert_id}": {
    ...getExpertInfoById,
  },
  "/experts/{expert_id}/certificates": {
    ...getCertificates,
  },
  "/experts/{expert_id}/majors": {
    ...getMajorsByExpertId,
  },
  "/experts/{expert_id}/bookings": {
    ...getBookingsByExpertId,
  },
  "/experts/{expert_id}/reviews": {
    ...getReviewsByExpertId,
  },
};
