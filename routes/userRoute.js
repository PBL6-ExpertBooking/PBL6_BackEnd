import express from "express";
import { auth, checkRole } from "../middlewares/authorization.js";
import { roles } from "../config/constant.js";
import controller from "../controllers/userController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get(
  "/all",
  auth,
  checkRole([roles.ADMIN]),
  controller.getUsersPagination
);
router.get("/info", auth, controller.getCurrentUserInfo);
router.put("/info", auth, upload.single("photo"), controller.updateUserInfo);
router.get("/info/:id", controller.getUserById);
router.put("/change-password", auth, controller.changePassword);

export default router;
