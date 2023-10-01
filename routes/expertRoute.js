import express from "express";
import { auth, checkRole } from "../middlewares/authorization.js";
import { roles } from "../config/constant.js";
import controller from "../controllers/expertController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/all", auth, controller.getExpertsPagination);
router.get(
  "/info",
  auth,
  checkRole([roles.EXPERT]),
  controller.getCurrentExpertInfo
);
router.get("/info/:id", auth, controller.getExpertById);
router.put(
  "/verify/:id",
  auth,
  checkRole([roles.ADMIN]),
  controller.verifyExpertById
);
router.post(
  "/certificates",
  auth,
  checkRole([roles.EXPERT]),
  upload.single("photo"),
  controller.addCertificate
);
router.get(
  "/certificates/:expert_id",
  auth,
  controller.getCertificatesByExpertId
);

export default router;
