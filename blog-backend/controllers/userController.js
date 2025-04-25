import apiResponse from "../helpers/apiResponseHelper.js";
import generateMessage from "../helpers/message.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
import User from "../schemas/userSchema.js";

// Create a new user by admin
export const createUser = async (req, res) => {
  try {
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

    return apiResponse(res, 201, true, generateMessage("create","User") , newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return apiResponse(res, 500, false, generateMessage("serverError", "User"));
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return apiResponse(res, 200, true, generateMessage("read","Users") , users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    return apiResponse(res, 500, false, generateMessage("serverError", "Users"));
  }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return apiResponse(res, 404, false, generateMessage("notFound", "User"));
    }
    return apiResponse(res, 200, true, generateMessage("read","User") , user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    return apiResponse(res, 500, false, generateMessage("serverError", "User"));
  }
};

// Block a user by ID
export const blockUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedUser) {
        return apiResponse(res, 404, false, generateMessage("notFound", "User"));
    }
    return apiResponse(
      res,
      200,
      true,
      generateMessage("block","User") ,
      updatedUser
    );
  } catch (error) {
    console.error("Error blocking user:", error);
    return apiResponse(res, 500, false, generateMessage("serverError", "User"));
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
        return apiResponse(res, 404, false, generateMessage("notFound", "User"));
    }
    return apiResponse(
      res,
      200,
      true,
      generateMessage("delete","User") ,
      deletedUser
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return apiResponse(res, 500, false, generateMessage("serverError", "User"));
  }
};
