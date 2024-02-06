import express from 'express';
import { checkOut } from '../controller/checkOutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-payment-inten' , checkOut);

export default router