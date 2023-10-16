import express from "express";
import { auth, checkRole } from "../middlewares/authorization.js";
import { roles } from "../config/constant.js";
import controller from "../controllers/userController.js";
import upload from "../middlewares/upload.js";
import trimRequest from "trim-request";
import validate from "../middlewares/yupValidation.js";
import schemas from "../validations/userValidations.js";

const router = express.Router();

router.get("", auth, checkRole([roles.ADMIN]), controller.getUsersPagination);
router.get("/current", auth, controller.getCurrentUserInfo);
router.put(
  "/current",
  auth,
  upload.single("photo"),
  trimRequest.all,
  validate(schemas.updateUserInfoSchema),
  controller.updateUserInfo
);
router.put(
  "/current/password",
  auth,
  trimRequest.all,
  validate(schemas.changePasswordSchema),
  controller.changePassword
);
router.post(
  "/current/promote-to-expert",
  auth,
  checkRole([roles.USER]),
  controller.promoteToExpert
);
router.get("/:id", controller.getUserById);
router.put(
  "/:id",
  auth,
  checkRole([roles.ADMIN]),
  trimRequest.all,
  validate(schemas.updateUserInfoSchema),
  upload.single("photo"),
  controller.updateUserInfoById
);
router.put(
  "/:user_id/enable",
  auth,
  checkRole([roles.ADMIN]),
  controller.enableUser
);
router.put(
  "/:user_id/disable",
  auth,
  checkRole([roles.ADMIN]),
  controller.disableUser
);

export default router;
