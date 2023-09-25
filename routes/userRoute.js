import express from "express";
import { auth } from "../middlewares/authorization.js";
import controller from "../controllers/userController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/info", auth, controller.getCurrentUserInfo);
router.post("/info", auth, upload.single("photo"), controller.updateUserInfo);
// router.get("/info/:id", controller.getUserById);
router.post("/change-password", auth, controller.changePassword);

export default router;
