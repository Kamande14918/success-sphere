// src/routes/users.routes.js
import express from 'express';
import { getUser } from '../controllers/users.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/me', verifyToken, getUser);

export default router;
