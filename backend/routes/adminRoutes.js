import express from 'express';
import { addAdmin, changePassword } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, admin, addAdmin);
router.put('/change-password', protect, admin, changePassword);

export default router;
