import express from "express";
import authRoute from "./authRoute.js";
import userRoute from "./userRoute.js";
import exportRoute from "./expertRoute.js";
import majorRoute from "./majorRoute.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/expert", exportRoute);
router.use("/major", majorRoute);

export default router;
