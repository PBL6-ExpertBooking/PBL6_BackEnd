import express from "express";
import { auth, checkRole } from "../middlewares/authorization.js";
import { roles } from "../config/constant.js";
import controller from "../controllers/userController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("", auth, checkRole([roles.ADMIN]), controller.getUsersPagination);
router.get("/current", auth, controller.getCurrentUserInfo);
router.put("/current", auth, upload.single("photo"), controller.updateUserInfo);
router.put("/password", auth, controller.changePassword);
router.post(
  "/promote-to-expert",
  auth,
  checkRole([roles.USER]),
  controller.promoteToExpert
);
router.put(
  "/enable/:user_id",
  auth,
  checkRole([roles.ADMIN]),
  controller.enableUser
);
router.put(
  "/disable/:user_id",
  auth,
  checkRole([roles.ADMIN]),
  controller.disableUser
);
router.get("/:id", controller.getUserById);
router.put(
  "/:id",
  auth,
  checkRole([roles.ADMIN]),
  upload.single("photo"),
  controller.updateUserInfoById
);

export default router;
