const roles = {
  USER: "USER",
  EXPERT: "EXPERT",
  ADMIN: "ADMIN",
};

const tokenTypes = {
  ACCESS: "access",
  REFRESH: "refresh",
};

const job_request_status = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  CANCELED: "CANCELED",
  DONE: "DONE",
};

const booking_status = {
  PROCESSING: "PROCESSING",
  CANCELED: "CANCELED",
  DONE: "DONE",
};

const transaction_types = {
  DEPOSIT: "DEPOSIT",
  WITHDRAWAL: "WITHDRAWAL",
  PAYMENT: "PAYMENT",
};

const transaction_status = {
  PROCESSING: "PROCESSING",
  CANCELED: "CANCELED",
  DONE: "DONE",
};

const notification_types = {
  NEW_JOB_REQUEST: "NEW_JOB_REQUEST",
  PAYMENT: "PAYMENT",
};

export {
  roles,
  tokenTypes,
  booking_status,
  transaction_status,
  transaction_types,
  job_request_status,
  notification_types,
};
