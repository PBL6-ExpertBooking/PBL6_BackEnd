import mongoose from "mongoose";
import { JobsCount } from "../models/index.js";
import datetime from "../utils/datetime.js";

const increaseTodayJobsCountByExpertId = async (expert_id) => {
  await JobsCount.findOneAndUpdate(
    {
      expert: new mongoose.Types.ObjectId(expert_id),
      date: datetime.getStartOfToday(),
    },
    {
      $inc: { count: 1 },
    },
    {
      upsert: true,
    }
  );
};

export default {
  increaseTodayJobsCountByExpertId,
};
