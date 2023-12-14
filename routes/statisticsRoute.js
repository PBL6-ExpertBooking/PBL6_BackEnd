import express from "express";
import { auth, checkRole } from "../middlewares/authorization.js";
import { roles } from "../config/constant.js";
import controller from "../controllers/statisticsController.js";

const router = express.Router();

router.get("/admin", auth, checkRole([roles.ADMIN]), controller.getStatisticsForAdmin);

export default router;
