import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  blockUser,
  createUser,
} from "../controllers/userController.js";
import { isAdmin } from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.get("/create", [isAdmin], createUser);
userRoutes.get("/", [isAdmin], getAllUsers);
userRoutes.get("/:id", getUserById);
userRoutes.delete("/:id", [isAdmin], deleteUser);
userRoutes.post("/:id", [isAdmin], blockUser);

export default userRoutes;
