import mongoose from "mongoose";

const jobRequestSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.ObjectId, ref: "users" },
    major_id: { type: mongoose.Schema.ObjectId, ref: "majors" },
    descriptions: String,
    address: String,
    budget: Number,
  },
  { collection: "job_request" }
);

const JobRequest = mongoose.model("JobRequest", jobRequestSchema);

export default JobRequest;
