import getAllExperts from "./getAllExperts.js";
import getExpertInfoById from "./getExpertInfoById.js";
import getCertificates from "./getCertificates.js";
import getCurrentExpertInfo from "./getCurrentExpertInfo.js";
import getReviewsByExpertId from "./getReviewsByExpertId.js";
import getUnverifiedExpert from "./getUnverifiedExpert.js";
import getRecommendedJobRequestsForCurrentExpert from "./getRecommendedJobRequestsForCurrentExpert.js";
import getTopExperts from "./getTopExperts.js";
import getAcceptedJobRequests from "./getAcceptedJobRequests.js";
import getCurrentExpertMajors from "./getCurrentExpertMajors.js";
import getMajorsByExpertId from "./getMajorsByExpertId.js";
import deleteRecommendedJobRequest from "./deleteRecommendedJobRequest.js";

export default {
  "/experts": {
    ...getAllExperts,
  },
  "/experts/top": {
    ...getTopExperts,
  },
  "/experts/unverified": {
    ...getUnverifiedExpert,
  },
  "/experts/current": {
    ...getCurrentExpertInfo,
  },
  "/experts/current/majors": {
    ...getCurrentExpertMajors,
  },
  "/experts/current/recommended-job-requests": {
    ...getRecommendedJobRequestsForCurrentExpert,
  },
  "/experts/current/recommended-job-requests/{job_request_id}": {
    ...deleteRecommendedJobRequest,
  },
  "/experts/current/accepted-job-requests": {
    ...getAcceptedJobRequests,
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
  "/experts/{expert_id}/reviews": {
    ...getReviewsByExpertId,
  },
};
