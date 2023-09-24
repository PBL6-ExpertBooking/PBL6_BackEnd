import mongoose from "mongoose";

const expertInfoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      index: true,
    },
    major: { type: mongoose.Schema.ObjectId, ref: "majors" },
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
