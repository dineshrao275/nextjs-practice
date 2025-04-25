import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import apiResponse from "../helpers/apiResponseHelper.js";
import generateMessage from "../helpers/message.js";
import { logging } from "../helpers/commonHelper.js";
import User from "../schemas/userSchema.js";

dotenv.config();

// Middleware: Authenticate User
const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return apiResponse(
      res,
      401,
      false,
      generateMessage("unauthorized", "User")
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return apiResponse(
        res,
        401,
        false,
        generateMessage("unauthorized", "User")
      );
    }
    req.user = user;
    next();
  } catch (err) {
    return apiResponse(
      res,
      401,
      false,
      generateMessage("invalidToken", "User")
    );
  }
};

// Middleware: Check Admin Access
export const isAdmin = (req, res, next) => {
  try {
    logging("info", "Checking admin access", {
      method: req.method,
      url: req.originalUrl,
    });

    if (req.user && req.user.isAdmin) {
      next();
    } else {
      logging("warn", "Access denied for non-admin user", {
        method: req.method,
        url: req.originalUrl,
        userId: req.user ? req.user._id : null,
      });

      return apiResponse(
        res,
        403,
        false,
        generateMessage("accessDenied", "User")
      );
    }
  } catch (err) {
    logging("error", "Error checking admin access", {
      error: err.message,
      method: req.method,
      url: req.originalUrl,
    });

    return apiResponse(res, 500, false, generateMessage("serverError", "User"));
  }
};

export default authenticate;
