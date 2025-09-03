import { Router } from "express";
import multer from "multer";

import UserController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();
const upload = multer();

router.get("/", UserController.getAllUsers);
router.get("/:id", authMiddleware, UserController.getUserById);
router.get("/me", authMiddleware, UserController.currentUser);
router.post("/", UserController.createUser);
router.put("/", authMiddleware, UserController.updateUser);
router.delete("/", authMiddleware, UserController.deleteUser);
router.post(
  "/photo",
  authMiddleware,
  upload.single("file"),
  UserController.uploadPhoto,
);

export default router;
