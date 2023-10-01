import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    rating: Number,
    comment: String,
    status: Number,
  },
  { collection: "review" }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
