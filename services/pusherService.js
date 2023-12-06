import pusher from "../utils/pusher.js";

const updateBalance = (user_id, balance) => {
  pusher.trigger(`user-${user_id}`, "update_balance", {
    balance: balance,
  });
};

const notify = (notification) => {
  pusher.trigger(`user-${notification.user}`, "notification", {
    notification,
  });
};

const notifyMultipleUsers = (notifications) => {
  for (const notification of notifications) {
    notify(notification);
  }
};

export default {
  updateBalance,
  notify,
  notifyMultipleUsers,
};
