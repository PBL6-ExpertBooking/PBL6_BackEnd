import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    name: String,
    major: {
      type: mongoose.Schema.ObjectId,
      unique: true,
      ref: "Major",
    },
    descriptions: String,
    photo_url: String,
    photo_public_id: String,
    isVerified: { type: Boolean, default: false },
  },
  { collection: "certificate" }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
