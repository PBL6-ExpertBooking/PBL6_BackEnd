import express from "express";
import { auth, checkRole } from "../middlewares/authorization.js";
import { roles } from "../config/constant.js";
import controller from "../controllers/certificateController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "",
  auth,
  checkRole([roles.EXPERT]),
  upload.single("photo"),
  controller.createCertificate
);
router.delete(
  "/:certificate_id",
  auth,
  checkRole([roles.EXPERT]),
  controller.deleteCertificate
);

export default router;
