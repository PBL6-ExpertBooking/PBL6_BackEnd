import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const expertInfoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      index: true,
    },
    major: { type: mongoose.Schema.ObjectId, ref: "majors" },
    descriptions: String,
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

expertInfoSchema.plugin(mongoosePaginate);

const ExpertInfo = mongoose.model("ExpertInfo", expertInfoSchema);

export default ExpertInfo;
