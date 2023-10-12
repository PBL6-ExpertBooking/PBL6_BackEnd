import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User", index: true },
    expert: { type: mongoose.Schema.ObjectId, ref: "ExpertInfo", index: true },
    booking: { type: mongoose.Schema.ObjectId, ref: "Booking", index: true },
    rating: { type: Number, min: 0, max: 5 },
    comment: String,
    status: Number,
  },
  {
    collection: "review",
    timestamps: true,
  }
);

reviewSchema.plugin(mongoosePaginate);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
