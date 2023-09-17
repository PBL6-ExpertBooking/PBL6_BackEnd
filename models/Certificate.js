import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    name: String,
    photo_url: String,
    status: String,
  },
  { collection: "certificate" }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
