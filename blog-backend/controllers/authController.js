import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../schemas/userSchema.js";
import apiResponse from "../helpers/apiResponseHelper.js";
import generateMessage from "../helpers/message.js";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return apiResponse(res, 400, false, generateMessage("userExists", "User"));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return apiResponse(res, 201, true, generateMessage("create", "User"), {
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return apiResponse(res, 500, false, generateMessage("serverError", "User"));
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return apiResponse(
        res,
        400,
        false,
        generateMessage("invalidCredentials", "User")
      );
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return apiResponse(
        res,
        400,
        false,
        generateMessage("invalidCredentials", "User")
      );
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return apiResponse(res, 200, true, generateMessage("login", "User"), {
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return apiResponse(res, 500, false, generateMessage("serverError", "User"));
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Set the token expiration to 0 by sending a Set-Cookie header with a past expiration date
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    return apiResponse(res, 200, true, generateMessage("logout", "User"));
  } catch (error) {
    console.error("Error logging out user:", error);
    return apiResponse(res, 500, false, generateMessage("serverError", "User"));
  }
};

