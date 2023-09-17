import express from "express";
import controller from "../controller/authController.js";

const router = express.Router();

router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/logout").post(controller.logout);
router.route("/refresh-token").post(controller.refreshToken);

export default router;
