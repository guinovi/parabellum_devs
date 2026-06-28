import express from 'express';
import { getChatToken } from '../controllers/chatControllers.js';
import { requiereAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/api/chat/token', requiereAuth, getChatToken);

export default router;
