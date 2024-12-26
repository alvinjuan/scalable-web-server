import { Router } from 'express';
import authMiddleware from '../middleware/auth';
import User from '../models/user';

const router = Router();

// Protected routes example
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add more API routes here
router.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

export default router;