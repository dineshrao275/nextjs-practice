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
const blogRoutes = express.Router();

blogRoutes.get("/", getAllBlogs);
blogRoutes.get("/:id", getBlogById);
blogRoutes.post("/",[validateBlogRequest,handleValidationErrors],createBlog);
blogRoutes.put("/:id", updateBlog);
blogRoutes.delete("/:id", deleteBlog);

export default blogRoutes;
