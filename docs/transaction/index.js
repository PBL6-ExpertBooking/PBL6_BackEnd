import createDeposit from "./createDeposit.js";

export default {
  "/transactions/deposit": {
    ...createDeposit,
  },
};
