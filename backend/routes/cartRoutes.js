import express from 'express';
import {
  addCart , getCart
} from '../controller/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect , getCart);
router.post('/add' , protect , addCart);

export default router;
