import mongoose from "mongoose";
import recommendedExpertsService from "../services/recommendedExpertsService.js";
import { format as prettyFormat } from "pretty-format";
import dotenv from "dotenv";
import ExpertInfo from "../models/ExpertInfo.js";
import JobRequest from "../models/JobRequest.js";

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;

await mongoose.connect(CONNECTION_URL);

await JobRequest.deleteMany({ status: {$ne: 'DONE'} });

// console.log(
//   prettyFormat(
//     await recommendedExpertsService.getRandomExpertIds({
//       major_id: "65574433f4354e1f8062acd6",
//       percent: 100,
//       min_experts: 5,
//     })
//   )
// );

// await recommendedExpertsService.createRecommendedExperts(
//   "655af535619bfcbf6de2ef48"
// );

// console.log("done");

// const experts = await ExpertInfo.find({}).lean();
// console.log(
//   prettyFormat(
//     recommendedExpertsService.getWeightedRandomExpertIds(experts, 10)
//   )
// );

// import moment from "moment";
// console.log(moment().utc().startOf("day").toDate());

// import certificateService from "../services/certificateService.js";

// const experts = await ExpertInfo.find({ certificates: { $ne: [] } }).lean();
// experts.forEach(async (e) => {
//   await certificateService.updateVerifiedMajor(e._id);
// });
