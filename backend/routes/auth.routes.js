import express from 'express';
import { registerUser, loginUser, registerAdmin, loginAdmin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin/register', registerAdmin); // Define admin registration endpoint
router.post('/admin/login', loginAdmin); // Define admin login endpoint

export default router;
