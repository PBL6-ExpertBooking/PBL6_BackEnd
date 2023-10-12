import createJobRequest from "./createJobRequest.js";
import getJobRequests from "./getJobRequests.js";
import getJobRequestById from "./getJobRequestById.js";

export default {
  "/job_requests": {
    ...createJobRequest,
    ...getJobRequests,
  },
  "/job_requests/{job_request_id}": {
    ...getJobRequestById,
  },
};
