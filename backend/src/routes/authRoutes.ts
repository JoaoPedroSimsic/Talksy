import { Router, Response } from 'express';
import AuthController from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';
import { AuthRequest } from '../types/AuthRequest';

const router = Router();

router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/check', authMiddleware, (req: AuthRequest, res: Response) => {
	res.status(200).json({ user: req.userId });
});

export default router;
