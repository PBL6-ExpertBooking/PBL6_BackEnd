import mongoose from "mongoose";

const majorSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, index: true },
    descriptions: String,
  },
  { collection: "majors" }
);

const Major = mongoose.model("Major", majorSchema);

export default Major;
