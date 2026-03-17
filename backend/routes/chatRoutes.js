import express from 'express';
import { handleChat } from '../controllers/chatController.js';

const router = express.Router();

// Allow anyone to access the chatbot route, or you can add authMiddleware here if needed
router.post('/', handleChat);

export default router;
