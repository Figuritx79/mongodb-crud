import { Router } from 'express';
import { register, login, logout, getProfile } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', protect, getProfile);

export default router;