import express from "express";
import { auth, checkRole } from "../middlewares/authorization.js";
import { roles } from "../config/constant.js";
import controller from "../controllers/expertController.js";

const router = express.Router();

router.get("/all", auth, controller.getExpertsPagination);
router.get("/info/:id", auth, controller.getExpertById);
router.put(
  "/verify/:id",
  auth,
  checkRole([roles.ADMIN]),
  controller.verifyExpertById
);

export default router;
