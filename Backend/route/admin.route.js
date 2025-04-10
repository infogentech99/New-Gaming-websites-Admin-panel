import express from 'express';
import { addMoney, assign, deleteUser, getUserBet, getUserTransaction, login, updateUser, withdrawMoney} from '../controller/admin.controller.js';
const router = express.Router();

router.put('/assign-leader',assign);
router.put("/update-user/:id",updateUser);
router.post('/login',login);
router.delete("/delete-user/:id",deleteUser);

router.get('/get-transactions/:id' , getUserTransaction);
router.get('/getBets/:id' , getUserBet);

router.post("/add-money/:id",addMoney);
router.post("/withdraw-money/:id",withdrawMoney);

export default router;