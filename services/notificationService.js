import { Notification, RecommendedExperts } from "../models/index.js";
import { notification_types } from "../config/constant.js";

const fetchNotificationsByUserId = async (user_id, limit = 10) => {
  const notifications = await Notification.find({ user: user_id })
    .sort({ createdAt: -1 })
    .limit(limit);
  return notifications;
};

const updateSeenNotification = async (notification_id, user_id) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notification_id, user: user_id },
    { is_seen: true },
    { new: true }
  );
  return notification;
};

const notifyNewJobRequest = async (job_request_id) => {
  const recommendedExperts = await RecommendedExperts.findOne({
    job_request: job_request_id,
  })
    .populate([
      {
        path: "job_request",
        select: "user title descriptions price",
        populate: {
          path: "user",
          select: "first_name last_name photo_url",
        },
      },
      {
        path: "experts",
        select: "user",
      },
    ])
    .lean();
  const job_request = recommendedExperts.job_request;
  const experts = recommendedExperts.experts;

  const new_notifications = experts.map((expert) => {
    return {
      user: expert.user,
      type: notification_types.NEW_JOB_REQUEST,
      ref: {
        job_request,
      },
    };
  });

  await Notification.insertMany(new_notifications);

  return new_notifications;
};

export default {
  fetchNotificationsByUserId,
  updateSeenNotification,
  notifyNewJobRequest,
};
