import httpStatus from "http-status";
import {
  RecommendedExperts,
  JobRequest,
  ExpertInfo,
  Certificate,
  User,
} from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";
import moment from "moment";

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
    // {
    //   $sample: { size: 2 },
    // },
  ]).exec();

  await RecommendedExperts.create({
    job_request: job_request_id,
    experts: random_experts.map((expert) => expert._id),
  });
};

const getRandomExpertIds = async ({
  major_id,
  city_code = null,
  percent = 100,
  min_experts = null,
}) => {
  const pipeline = [
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
        "certificates.major": new mongoose.Types.ObjectId(major_id),
        "certificates.isVerified": true,
      },
    },
    {
      $group: {
        _id: "$_id",
        user: { $first: "$user" },
        descriptions: { $first: "$descriptions" },
        average_rating: { $first: "$average_rating" },
        createdAt: { $first: "$createdAt" },
      },
    },
  ];

  if (city_code) {
    pipeline.push(
      {
        $lookup: {
          from: User.collection.name,
          localField: "user",
          foreignField: "_id",
          as: "user",
          pipeline: [
            {
              $project: {
                address: 1,
              },
            },
            {
              $match: {
                "address.city.code": city_code,
              },
            },
          ],
        },
      },
      {
        $unwind: "$user",
      }
    );
  }

  const experts = await ExpertInfo.aggregate(pipeline).exec();

  if (min_experts && experts.length <= min_experts) return experts;

  return getWeightedRandomExperts(experts);
};

const getWeightedRandomExperts = (experts) => {
  const normalizedExperts = normalize(experts);
  const weightedExperts = normalizedExperts.map((expert) => {
    return {
      ...expert,
      weight: calculateExpertWeight(
        expert.normalized_rating,
        expert.normalized_days_diff
      ),
    };
  });

  return weightedExperts;
};

const normalize = (experts) => {
  const max_rating = 5;
  const today = moment();
  experts = experts.map((expert) => {
    return {
      ...expert,
      normalized_rating: minMaxNormalize(expert.average_rating, 0, max_rating),
      days_diff_from_today: today.diff(moment(expert.createdAt), "days"),
    };
  });

  const days_diffs = experts.map((expert) => expert.days_diff_from_today);
  const max_days_diff = Math.max(...days_diffs);
  const min_days_diff = Math.min(...days_diffs);

  experts = experts.map((expert) => {
    return {
      ...expert,
      normalized_days_diff: reversedMinMaxNormalize(
        expert.days_diff_from_today,
        min_days_diff,
        max_days_diff
      ),
    };
  });

  return experts;
};

const reversedMinMaxNormalize = (x, min, max) => {
  if (max === min) return 0;
  return (max - x) / (max - min);
};

const minMaxNormalize = (x, min, max) => {
  if (max === min) return 0;
  return (x - min) / (max - min);
};

const calculateExpertWeight = (rating, day_diff) => {
  return 0.7 * rating + 0.3 * day_diff;
};

export default {
  createRecommendedExperts,
  getRandomExpertIds,
  normalize,
  getWeightedRandomExperts,
};
