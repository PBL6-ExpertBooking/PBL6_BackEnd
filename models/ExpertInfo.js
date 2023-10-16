import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const expertInfoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      index: true,
    },
    descriptions: String,
    certificates: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          unique: true,
          ref: "Certificate",
        },
      ],
      default: [],
    },
    average_rating: { type: Number, min: 0, max: 5, default: 0 },
    rating_count: { type: Number, default: 0 },
  },
  { collection: "expert_info" }
);

expertInfoSchema.plugin(mongoosePaginate);

const ExpertInfo = mongoose.model("ExpertInfo", expertInfoSchema);

export default ExpertInfo;
