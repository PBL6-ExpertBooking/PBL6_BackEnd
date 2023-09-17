import express from "express";
import controller from "../controller/authController.js";

const router = express.Router();

router.route("/register").post(controller.register);

export default router;
