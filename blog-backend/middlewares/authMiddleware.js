import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import apiResponse from "../helpers/apiResponseHelper.js";
import generateMessage from "../helpers/message.js";

dotenv.config();

// Middleware: Authenticate User
const authenticate = (req, res, next) => {
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
    req.user = decoded;
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
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return apiResponse(
        res,
        403,
        false,
        generateMessage("accessDenied", "User")
      );
    }
  } catch (err) {
    return apiResponse(res, 500, false, generateMessage("serverError", "User"));
  }
};

export default authenticate;
