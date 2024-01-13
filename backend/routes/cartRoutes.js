import express from 'express';
import {
  addCart , getCart,removeCartItem , deleteCartItem
} from '../controller/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect , getCart);
router.post('/add' , protect , addCart);
router.post('/decrease/:id', protect, removeCartItem)
router.delete('/delete/:id', protect , deleteCartItem)

export default router;
