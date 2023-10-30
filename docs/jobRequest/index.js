import createJobRequest from "./createJobRequest.js";
import getJobRequests from "./getJobRequests.js";
import getJobRequestById from "./getJobRequestById.js";
import acceptJobRequest from "./acceptJobRequest.js";
import updateJobRequest from "./updateJobRequest.js";

export default {
  "/job_requests": {
    ...createJobRequest,
    ...getJobRequests,
  },
  "/job_requests/{job_request_id}": {
    ...getJobRequestById,
    ...updateJobRequest,
  },
  "/job_requests/{job_request_id}/accept": {
    ...acceptJobRequest,
  },
};
