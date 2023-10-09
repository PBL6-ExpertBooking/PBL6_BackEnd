import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const jobRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    major: { type: mongoose.Schema.ObjectId, ref: "Major" },
    descriptions: String,
    address: String,
    budget: Number,
  },
  { collection: "job_request" }
);

jobRequestSchema.plugin(mongoosePaginate);

const JobRequest = mongoose.model("JobRequest", jobRequestSchema);

export default JobRequest;
