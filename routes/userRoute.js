import express from "express";
import { auth } from "../middlewares/authorization.js";
import controller from "../controllers/userController.js";

const router = express.Router();

router.post("/change-password", auth, controller.changePassword);

export default router;
