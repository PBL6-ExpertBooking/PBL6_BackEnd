import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    name: String,
    photo_url: String,
    photo_public_id: String,
    status: String,
  },
  { collection: "certificate" }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
