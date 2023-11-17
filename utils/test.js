import mongoose from "mongoose";
import recommendedExpertsService from "../services/recommendedExpertsService.js";
import { format as prettyFormat } from "pretty-format";
import dotenv from "dotenv";
import ExpertInfo from "../models/ExpertInfo.js";

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;

await mongoose.connect(CONNECTION_URL);

console.log(
  prettyFormat(
    await recommendedExpertsService.getRandomExpertIds({
      major_id: "65574433f4354e1f8062acd6",
    })
  )
);

// const experts = await ExpertInfo.find({}).lean();
// console.log(
//   prettyFormat(recommendedExpertsService.getWeightedRandomExperts(experts))
// );
