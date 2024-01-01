import express from 'express';
import { checkRole } from '../middlewares/authorization.js';
import { roles } from '../config/constant.js';
import pushTokenController from '../controllers/pushTokenController.js';

const router = express.Router();

router.post('', checkRole([roles.EXPERT, roles.USER]), pushTokenController.saveToken);

export default router;
