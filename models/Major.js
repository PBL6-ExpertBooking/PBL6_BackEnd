import mongoose from "mongoose";

const majorSchema = new mongoose.Schema(
  {
    name: String,
    descriptions: String,
  },
  { collection: "majors" }
);

const Major = mongoose.model("Major", majorSchema);

export default Major;
