import User from "../schemas/userSchema.js";
import winston from "winston";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return apiResponse(res, 404, false, generateMessage("notFound", "User"));
    }

    return apiResponse(res, 200, true, generateMessage("userExists"), {
      user,
    });
  } catch (error) {
    console.error("Error retrieving user details:", error);
    return apiResponse(res, 500, false, generateMessage("serverError", "User"));
  }
};

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

export const logging = (level, message, meta = {}) => {
    logger.log({
        level,
        message,
        ...meta,
    });
};
