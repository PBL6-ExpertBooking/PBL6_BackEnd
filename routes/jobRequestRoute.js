import express from "express";
import controller from "../controllers/jobRequestController.js";
import { auth, checkRole } from "../middlewares/authorization.js";
import { roles } from "../config/constant.js";

const router = express.Router();

router.get("", auth, controller.getJobRequestsPagination);
router.post("", auth, checkRole([roles.USER]), controller.createJobRequest);
router.get("/:job_request_id", auth, controller.getJobRequestById);
router.post(
  "/:job_request_id/accept",
  auth,
  checkRole([roles.EXPERT]),
  controller.acceptJobRequest
);

export default router;
