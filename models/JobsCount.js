import moment from "moment";
import mongoose from "mongoose";
import datetime from "../utils/datetime.js";

const jobsCountSchema = new mongoose.Schema({
  expert: { type: mongoose.Schema.ObjectId, ref: "ExpertInfo", index: true },
  date: { type: Date, default: datetime.getStartOfToday() },
  count: { type: Number, default: 0, min: 0 },
});

const JobsCount = mongoose.model("JobsCount", jobsCountSchema);

export default JobsCount;
