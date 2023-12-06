import { Notification, RecommendedExperts } from "../models/index.js";

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
        select: "title",
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
      message: `New job request: ${job_request.title}`,
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
