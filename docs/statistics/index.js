import admin from "./admin.js";
import income from "./income.js";
import expertIncome from "./expertIncome.js";

export default {
  "/statistics/admin": {
    ...admin,
  },
  "/statistics/income": {
    ...income,
  },
  "/statistics/current-expert-income": {
    ...expertIncome,
  },
};