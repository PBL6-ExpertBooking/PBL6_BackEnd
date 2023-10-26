import express from "express";
import { auth, checkRole } from "../middlewares/authorization.js";
import { roles } from "../config/constant.js";
import controller from "../controllers/bookingController.js";

const router = express.Router();

router.post("", auth, checkRole([roles.EXPERT]), controller.createBooking);
router.post(
  "/:booking_id/accept",
  auth,
  checkRole([roles.USER]),
  controller.acceptBooking
);

export default router;
