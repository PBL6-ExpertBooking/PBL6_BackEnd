import { notification_types } from "../config/constant.js";
import { sendPushNotifications } from "../utils/pushNotification.js";
import pusher from "../utils/pusher.js";

const updateBalance = (user_id, balance) => {
  pusher.trigger(`user-${user_id}`, "update_balance", {
    balance: balance,
  });
};

const notify = async (notification) => {
  pusher.trigger(`user-${notification.user}`, "notification", {
    notification,
  });

  const params = { title: "", body: "", user_ids: [notification.user] };

  switch (notification.type) {
    case notification_types.NEW_JOB_REQUEST:
      params.title = "...";
      params.body = "...";
      break;
  }

  await sendPushNotifications(params);
};

const notifyMultipleUsers = async (notifications) => {
  const user_ids = [];

  for (const notification of notifications) {
    user_ids.push(notification.user);
    notify(notification);
  }

  const params = { title: "", body: "", user_ids };

  switch (notifications[0].type) {
    case notification_types.NEW_JOB_REQUEST:
      params.title = "...";
      params.body = "...";
      break;
  }

  await sendPushNotifications(params);
};

export default {
  updateBalance,
  notify,
  notifyMultipleUsers,
};
