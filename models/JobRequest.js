import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { job_request_status } from "../config/constant.js";

const jobRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    major: { type: mongoose.Schema.ObjectId, ref: "Major" },
    title: String,
    descriptions: String,
    address: String,
    budget: {
      min: Number,
      max: Number,
    },
    status: {
      type: String,
      enum: Object.values(job_request_status),
      default: job_request_status.PENDING,
    },
  },
  {
    collection: "job_request",
    timestamps: true,
  }
);

jobRequestSchema.plugin(mongoosePaginate);

const JobRequest = mongoose.model("JobRequest", jobRequestSchema);

export default JobRequest;
