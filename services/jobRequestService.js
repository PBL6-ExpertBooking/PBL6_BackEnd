import httpStatus from "http-status";
import { ExpertInfo, JobRequest, Major, User } from "../models/index.js";
import { job_request_status } from "../config/constant.js";
import ApiError from "../utils/ApiError.js";

const createJobRequest = async ({
  user_id,
  major_id,
  title,
  descriptions,
  address,
  price,
}) => {
  if (!(await User.findById(user_id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  if (!(await Major.findById(major_id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Major not found");
  }
  // TODO: check user's balance

  const jobRequest = await JobRequest.create({
    user: user_id,
    major: major_id,
    title,
    descriptions,
    address,
    price,
    status: job_request_status.PENDING,
  });
  return jobRequest;
};

const fetchJobRequestsPagination = async (
  page = 1,
  limit = 10,
  major_id = null
) => {
  let query = {};
  if (major_id) query.major = major_id;
  const pagination = await JobRequest.paginate(query, {
    populate: [
      {
        path: "user",
        select: "first_name last_name photo_url",
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
  });
  return pagination;
};

const fetchJobRequestById = async (job_request_id) => {
  const jobRequest = await JobRequest.findById(job_request_id).populate([
    {
      path: "user",
      select: "first_name last_name photo_url",
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

const fetchJobRequestsPaginationByUserId = async (
  user_id,
  page = 1,
  limit = 10,
  major_id = null
) => {
  let query = { user: user_id };
  if (major_id) query.major = major_id;
  const pagination = await JobRequest.paginate(query, {
    populate: [
      {
        path: "user",
        select: "first_name last_name photo_url",
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
  });
  return pagination;
};

const acceptJobRequestByExpert = async ({ user_id, job_request_id }) => {
  const expert = await ExpertInfo.findOne({ user: user_id }).lean();
  if (!expert) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
  }
  const job_request = await JobRequest.findById(job_request_id);
  if (!job_request) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Job request not found");
  }
  if (job_request.status !== job_request_status.PENDING) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This job is not available");
  }
  job_request.expert = expert._id;
  job_request.status = job_request_status.PROCESSING;
  job_request.time_booking = new Date();
  await job_request.save();
  return job_request;
};

export default {
  createJobRequest,
  fetchJobRequestsPagination,
  fetchJobRequestById,
  fetchJobRequestsPaginationByUserId,
  acceptJobRequestByExpert,
};
