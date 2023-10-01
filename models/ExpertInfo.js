import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const expertInfoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      index: true,
    },
    majors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Major",
      },
    ],
    descriptions: String,
    certificates: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Certificate",
      },
    ],
    isVerified: Boolean,
    average_rating: Number,
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Review",
      },
    ],
  },
  { collection: "expert_info" }
);

expertInfoSchema.plugin(mongoosePaginate);

const ExpertInfo = mongoose.model("ExpertInfo", expertInfoSchema);

export default ExpertInfo;
