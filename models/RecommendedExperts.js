import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const recommendedExpertsSchema = new mongoose.Schema({
  job_request: {
    type: mongoose.Schema.ObjectId,
    ref: "JobRequest",
    unique: true,
  },
  experts: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "ExpertInfo",
      },
    ],
    default: [],
  },
});

const RecommendedExperts = mongoose.model(
  "RecommendedExperts",
  recommendedExpertsSchema
);

export default RecommendedExperts;