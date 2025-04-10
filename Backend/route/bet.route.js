import express from 'express';
import { betPlace, getBet } from '../controller/bet.controller.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/place-bet',protectRoute,betPlace);
router.get('/getBets',protectRoute,getBet);



export default router;