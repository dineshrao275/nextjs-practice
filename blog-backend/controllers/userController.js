import apiResponse from "../helpers/apiResponseHelper.js";
import generateMessage from "../helpers/message.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
import User from "../schemas/userSchema.js";
import { logging } from "../helpers/commonHelper.js";

// Create a new user by admin
export const createUser = async (req, res) => {
  try {
    logging(
      "info",
      "Creating a new user",
      { method: req.method, url: req.originalUrl }
    );
    const { name, email, password, role } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !isAdmin) {
      return apiResponse(res, 400, false, generateMessage("missingFields", "User"));
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return apiResponse(res, 400, false, generateMessage("userExists", "User"));
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    // Save the user to the database
    await newUser.save();
    logging(
      "info",
      "User created successfully",
      { userId: newUser._id, method: req.method, url: req.originalUrl }
    );
    return apiResponse(res, 201, true, generateMessage("create","User") , newUser);
  } catch (error) {
    logging(
      "error",
      "Error creating user",
      { error: error.message, method: req.method, url: req.originalUrl }
    );
    return apiResponse(res, 500, false, generateMessage("serverError", "User"));
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
    if (!users || users.length === 0) {
      return apiResponse(res, 404, false, generateMessage("notFound", "Users"));
    }
    return apiResponse(res, 200, true, generateMessage("read","Users") , users);
  } catch (error) {
    logging(
      "error",
      "Error retrieving users",
      { error: error.message, method: req.method, url: req.originalUrl }
    );
    return apiResponse(res, 500, false, generateMessage("serverError", "Users"));
  }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return apiResponse(res, 404, false, generateMessage("notFound", "User"));
    }
    return apiResponse(res, 200, true, generateMessage("read","User") , user);
  } catch (error) {
    logging(
      "error",
      "Error retrieving user",
      { error: error.message, method: req.method, url: req.originalUrl }
    );
    return apiResponse(res, 500, false, generateMessage("serverError", "User"));
  }
};

// Block a user by ID
export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return apiResponse(res, 404, false, generateMessage("notFound", "User"));
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: !user.isBlocked },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    logging(
      "info",
      `User ${updatedUser.isBlocked ? "blocked" : "unblocked"} successfully`,
      {
        userId: updatedUser._id,
        method: req.method,
        url: req.originalUrl,
      }
    );

    return apiResponse(
      res,
      200,
      true,
      generateMessage(
        updatedUser.isBlocked ? "block" : "unblock",
        "User"
      ),
      updatedUser
    );
  } catch (error) {
    logging("error", "Error blocking/unblocking user", {
      error: error.message,
      method: req.method,
      url: req.originalUrl,
    });

    return apiResponse(
      res,
      500,
      false,
      generateMessage("serverError", "User")
    );
  }
};


// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id).select("-password");
    if (!deletedUser) {
      return apiResponse(res, 404, false, generateMessage("notFound", "User"));
    }
    if (!deletedUser) {
        return apiResponse(res, 404, false, generateMessage("notFound", "User"));
    }
    logging(
      "info",
      "User deleted successfully",
      { userId: deletedUser._id, method: req.method, url: req.originalUrl }
    );
    return apiResponse(
      res,
      200,
      true,
      generateMessage("delete","User") ,
      deletedUser
    );
  } catch (error) {
    logging(
      "error",
      "Error deleting user",
      { error: error.message, method: req.method, url: req.originalUrl }
    );
    return apiResponse(res, 500, false, generateMessage("serverError", "User"));
  }
};
