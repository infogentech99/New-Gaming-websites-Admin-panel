import express from 'express';
import { login, logout, register ,userdata, walletData} from '../controller/user.controller.js';
import { protectRoute } from '../middleware/authMiddleware.js';
// import { authenticateToken, protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.post('/register',register);
// router.post('/login',login);
// router.get('/logout',logout);
// router.get('/like/:id',authenticateToken,like);
// router.post('/forgetpassword',ForgetPassword);

router.post('/register',register);
router.post('/login',login);
router.get('/get-users', userdata);
router.get('/logout', logout);
router.get('/get-wallet',protectRoute, walletData);

export default router;