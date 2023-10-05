import express from "express";
import { auth, checkRole } from "../middlewares/authorization.js";
import { roles } from "../config/constant.js";
import controller from "../controllers/expertController.js";

const router = express.Router();

router.get("/all", auth, controller.getExpertsPagination);
router.get(
  "/info",
  auth,
  checkRole([roles.EXPERT]),
  controller.getCurrentExpertInfo
);
router.get("/info/:id", auth, controller.getExpertById);
router.get(
  "/certificates/:expert_id",
  auth,
  controller.getCertificatesByExpertId
);
router.get("/majors/:expert_id", auth, controller.getVerifiedMajorsByExpertId);

export default router;
