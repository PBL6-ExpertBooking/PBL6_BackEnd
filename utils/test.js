import mongoose from "mongoose";
import recommendedExpertsService from "../services/recommendedExpertsService.js";
import { format as prettyFormat } from "pretty-format";
import dotenv from "dotenv";
import ExpertInfo from "../models/ExpertInfo.js";

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;

await mongoose.connect(CONNECTION_URL);

// console.log(
//   prettyFormat(
//     await recommendedExpertsService.getRandomExpertIds({
//       major_id: "65574433f4354e1f8062acd6",
//       percent: 100,
//       min_experts: 5,
//     })
//   )
// );

await recommendedExpertsService.createRecommendedExperts(
  "655af535619bfcbf6de2ef48"
);

console.log("done");

// const experts = await ExpertInfo.find({}).lean();
// console.log(
//   prettyFormat(
//     recommendedExpertsService.getWeightedRandomExpertIds(experts, 10)
//   )
// );

// import moment from "moment";
// console.log(moment().utc().startOf("day").toDate());
