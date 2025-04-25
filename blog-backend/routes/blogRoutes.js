import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { handleValidationErrors } from "../middlewares/validation.js";
import { validateBlogRequest } from "../requests/blogRequests.js";
import authenticate from "../middlewares/authMiddleware.js";

const blogRoutes = express.Router();

blogRoutes.get("/", getAllBlogs);
blogRoutes.get("/:id", getBlogById);
blogRoutes.post("/",[validateBlogRequest,handleValidationErrors,authenticate],createBlog);
blogRoutes.put("/:id",[authenticate], updateBlog);
blogRoutes.delete("/:id",[authenticate], deleteBlog);

export default blogRoutes;
