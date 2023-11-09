import express from "express";
import { auth, checkRole } from "../middlewares/authorization.js";
import { roles } from "../config/constant.js";
import controller from "../controllers/transactionController.js";

const router = express.Router();

router.post(
  "/deposit",
  auth,
  checkRole([roles.USER]),
  controller.createDeposit
);
router.post(
  "/payment",
  auth,
  checkRole([roles.USER]),
  controller.createPayment
);
router.post(
  "/payment/:transaction_id/execute",
  auth,
  checkRole([roles.USER]),
  controller.executePayment
);
router.get("/vnpay_return", controller.vnpayReturn);
router.get("/vnpay_ipn", controller.vnpayIpn);

export default router;
