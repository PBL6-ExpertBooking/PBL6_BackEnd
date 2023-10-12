import express from "express";
import controller from "../controllers/authController.js";
import trimRequest from "trim-request";
import validate from "../middlewares/yupValidation.js";
import schemas from "../validations/authValidations.js";

const router = express.Router();

router
  .route("/register")
  .post(trimRequest.all, validate(schemas.registerSchema), controller.register);
router
  .route("/login")
  .post(trimRequest.all, validate(schemas.loginSchema), controller.login);
router
  .route("/logout")
  .post(trimRequest.all, validate(schemas.logoutSchema), controller.logout);
router
  .route("/refresh-token")
  .post(
    trimRequest.all,
    validate(schemas.refreshTokenSchema),
    controller.refreshToken
  );
router
  .route("/activate/:token")
  .get(trimRequest.all, validate(schemas.activateSchema), controller.activate);
router.route("/google").post(controller.googleUserLogin);
router.route("/google").get(controller.googleUserVerify);

export default router;
