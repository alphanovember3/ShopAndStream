import express from 'express';
import { 
  authUser , registerUser , logoutUser , getUserProfile , updateUserProfile 
} from '../controller/userController.js';
import {
  addReward
} from '../controller/rewardController.js'
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/' , registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile', protect , getUserProfile);
router.put('/profile', protect , updateUserProfile);
router.post('/addreward', protect ,addReward);

export default router;