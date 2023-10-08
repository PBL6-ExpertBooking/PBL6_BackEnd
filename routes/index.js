import express from "express";
import authRoute from "./authRoute.js";
import userRoute from "./userRoute.js";
import exportRoute from "./expertRoute.js";
import majorRoute from "./majorRoute.js";
import certificateRoute from "./certificateRoute.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/experts", exportRoute);
router.use("/majors", majorRoute);
router.use("/certificates", certificateRoute);

export default router;
