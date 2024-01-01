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

  await pushNotification(notification.type, [notification.user])
};

const notifyMultipleUsers = async (notifications) => {
  const user_ids = [];

  for (const notification of notifications) {
    user_ids.push(notification.user);
    notify(notification);
  }

  await pushNotification(notifications[0].type, user_ids);
};

const pushNotification = async (notification_type, user_ids) => {
  const params = { title: "", body: "", user_ids };

  switch (notification_type) {
    case notification_types.NEW_JOB_REQUEST:
      params.title = "...";
      params.body = "...";
      break;
  }

  await sendPushNotifications(params);
}

export default {
  updateBalance,
  notify,
  notifyMultipleUsers,
};
