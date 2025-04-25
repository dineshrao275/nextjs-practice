import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  blockUser,
  createUser,
} from "../controllers/userController.js";
import authenticate, { isAdmin } from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.get("/create", [authenticate, isAdmin], createUser);
userRoutes.get("/", [authenticate, isAdmin], getAllUsers);
userRoutes.get("/:id", [authenticate], getUserById);
userRoutes.delete("/:id", [authenticate, isAdmin], deleteUser);
userRoutes.post("/:id", [authenticate, isAdmin], blockUser);

export default userRoutes;
