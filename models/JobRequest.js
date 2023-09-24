import mongoose from "mongoose";

const jobRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "users" },
    major: { type: mongoose.Schema.ObjectId, ref: "majors" },
    descriptions: String,
    address: String,
    budget: Number,
  },
  { collection: "job_request" }
);

const JobRequest = mongoose.model("JobRequest", jobRequestSchema);

export default JobRequest;
