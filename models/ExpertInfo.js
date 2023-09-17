import mongoose from "mongoose";

const expertInfoSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.ObjectId, ref: "users" },
    major_id: { type: mongoose.Schema.ObjectId, ref: "majors" },
    description: String,
    certificates: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "certificate",
      },
    ],
    isVerified: Boolean,
    average_rating: Number,
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "review",
      },
    ],
  },
  { collection: "expert_info" }
);

const ExpertInfo = mongoose.model("ExpertInfo", expertInfoSchema);

export default ExpertInfo;
