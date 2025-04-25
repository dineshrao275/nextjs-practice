import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import authenticate from "../middlewares/authMiddleware.js";

const authRoutes = express.Router();

// Route to register a new user
authRoutes.post("/register", registerUser);

// Route to log in a user
authRoutes.post("/login", loginUser);

// Route to log out a user
authRoutes.post("/logout", [authenticate], logoutUser);

export default authRoutes;
