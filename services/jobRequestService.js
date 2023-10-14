import httpStatus from "http-status";
import { JobRequest, Major, User } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

const createJobRequest = async ({
  user_id,
  major_id,
  descriptions,
  address,
  budget_min,
  budget_max,
}) => {
  if (budget_min > budget_max) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid budget");
  }
  if (!(await User.exists({ _id: user_id }))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  if (!(await Major.exists({ _id: major_id }))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Major not found");
  }
  // TODO: check user's balance

  const jobRequest = await JobRequest.create({
    user: user_id,
    major: major_id,
    descriptions,
    address,
    budget: {
      min: budget_min,
      max: budget_max,
    },
  });
  return jobRequest;
};

const fetchJobRequestsPagination = async (page = 1, limit = 10) => {
  const pagination = await JobRequest.paginate(
    {},
    {
      populate: [
        {
          path: "user",
          select:
            "first_name last_name gender phone address photo_url DoB email username role isRestricted isConfirmed",
        },
        {
          path: "major",
        },
      ],
      page,
      limit,
      lean: true,
      customLabels: {
        docs: "job_requests",
      },
    }
  );
  return pagination;
};

const fetchJobRequestById = async (job_request_id) => {
  const jobRequest = await JobRequest.findById(job_request_id).populate([
    {
      path: "user",
      select:
        "first_name last_name gender phone address photo_url DoB email username role isRestricted isConfirmed",
    },
    {
      path: "major",
    },
  ]);
  if (!jobRequest) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Job request not found");
  }
  return jobRequest;
};

export default {
  createJobRequest,
  fetchJobRequestsPagination,
  fetchJobRequestById,
};
