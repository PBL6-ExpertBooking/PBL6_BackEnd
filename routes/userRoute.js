import express from "express";
import { auth } from "../middlewares/authorization.js";
import controller from "../controllers/userController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/:id", controller.getUserById);
router.get("/info", auth, controller.getCurrentUserInfo);
router.post("/change-password", auth, controller.changePassword);
router.post(
  "/update-info",
  auth,
  upload.single("photo"),
  controller.updateUserInfo
);

export default router;
