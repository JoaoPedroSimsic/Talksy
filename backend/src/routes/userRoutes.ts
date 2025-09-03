import { Router } from 'express';
import multer from 'multer';

import UserController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware' 

const router = Router();
const upload = multer();

router.get('/', UserController.getAllUsers);
router.get('/:id', authMiddleware, UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', authMiddleware,  UserController.updateUser);
router.delete('/:id', authMiddleware,  UserController.deleteUser);
router.post('/:id/photo', authMiddleware, upload.single("file"), UserController.uploadPhoto)

export default router;
