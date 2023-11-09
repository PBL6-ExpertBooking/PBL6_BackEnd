import httpStatus from "http-status";
import {
  RecommendedExperts,
  JobRequest,
  ExpertInfo,
  Certificate,
} from "../models/index.js";
import ApiError from "../utils/ApiError.js";

const createRecommendedExperts = async (job_request_id) => {
  const job_request = await JobRequest.findById(job_request_id);
  if (!job_request) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Job request not found");
  }

  const random_experts = await ExpertInfo.aggregate([
    {
      $lookup: {
        from: Certificate.collection.name,
        localField: "certificates",
        foreignField: "_id",
        as: "certificates",
      },
    },
    {
      $unwind: "$certificates",
    },
    {
      $match: {
        "certificates.major": job_request.major,
        "certificates.isVerified": true,
      },
    },
    {
      $sample: { size: 2 },
    },
  ]).exec();

  await RecommendedExperts.create({
    job_request: job_request_id,
    experts: random_experts.map((expert) => expert._id),
  });
};

export default {
  createRecommendedExperts,
};
