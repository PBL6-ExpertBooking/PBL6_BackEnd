import express from "express";
import { auth, checkRole } from "../middlewares/authorization.js";
import { roles } from "../config/constant.js";
import controller from "../controllers/expertController.js";

const router = express.Router();

router.get("", auth, controller.getExpertsPagination);
router.get(
  "/current",
  auth,
  checkRole([roles.EXPERT]),
  controller.getCurrentExpertInfo
);
router.get("/:id", auth, controller.getExpertById);
router.get(
  "/:expert_id/certificates",
  auth,
  controller.getCertificatesByExpertId
);
router.get("/:expert_id/majors", auth, controller.getVerifiedMajorsByExpertId);

export default router;
