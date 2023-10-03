import express from "express";
import controller from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/logout").post(controller.logout);
router.route("/refresh-token").post(controller.refreshToken);
router.route("/activate/:token").get(controller.activate);
router.route("/google-user").post(controller.googleUserLogin);
router.route("/google-user").get(controller.googleUserVerify);

export default router;
