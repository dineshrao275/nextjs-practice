import Blog from "../schemas/blogSchema.js";
import generateMessage from "../helpers/message.js";
import apiResponse from "../helpers/apiResponseHelper.js";
import { logging } from "../helpers/commonHelper.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";

dayjs.extend(relativeTime);

export const getAllBlogs = async (req, res) => {
    try {
        let blogs;
        if (req.user.isAdmin) {
            blogs = await Blog.find().populate("author", "name profilePicture");
        } else {
            blogs = await Blog.find({ author: req.user._id }).populate("author", "name profilePicture");
        }

        if (!blogs || blogs.length === 0) {
            logging("warn", "No blogs found");
            return apiResponse(res, 404, false, generateMessage("notFound", "Blogs"));
        }

        // Optional: Format author to show only name
        const formattedBlogs = blogs.map((blog) => ({
            ...blog.toObject(),
            author: blog.author.name,
            profilePicture: blog.author.profilePicture,
            createdAt: dayjs(blog.createdAt).fromNow(),
        }));

        logging("info", "Fetched all blogs successfully");

        return apiResponse(
            res,
            200,
            true,
            generateMessage("read", "Blogs"),
            formattedBlogs
        );
    } catch (error) {
        logging("error", `Error fetching blogs: ${error.message}`);

        return apiResponse(
            res,
            500,
            false,
            generateMessage("serverError", "Blogs")
        );
    }
};
  

// Get a single blog by ID
export const getBlogById = async (req, res) => {
    try {
        let blog;
        if (req.user.isAdmin) {
            blog = await Blog.findById(req.params.id).populate("author", "name profilePicture");
        } else {
            blog = await Blog.findById(req.params.id);
            if (blog && blog.author.toString() !== req.user._id.toString()) {
                logging("warn", `Unauthorized access to blog with ID: ${req.params.id}`);
                return apiResponse(res, 403, false, generateMessage("unauthorized", "Blog"));
            }
        }
        if (!blog) {
            logging("warn", `Blog not found with ID: ${req.params.id}`);
            return apiResponse(res, 404, false, generateMessage("notFound", "Blog"));
        }
        logging("info", `Fetched blog with ID: ${req.params.id}`);
        return apiResponse(res, 200, true, generateMessage("read", "Blog"), blog);
    } catch (error) {
        logging("error", `Error fetching blog: ${error.message}`);
        return apiResponse(res, 500, false, generateMessage("serverError", "Blog"));
    }
};

// Create a new blog
export const createBlog = async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        const slug = newBlog.title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
        newBlog.slug = slug;

        // Check if the slug already exists
        const existingBlog = await Blog.findOne({ slug });
        if (existingBlog) {
            logging("warn", `Slug already exists: ${slug}`);
            return apiResponse(res, 400, false, generateMessage("alreadyExists", "Slug"));
        }
        const savedBlog = await newBlog.save();
        logging("info", "Blog created successfully");
        return apiResponse(res, 201, true, generateMessage("create", "Blog"), savedBlog);
    } catch (error) {
        logging("error", `Error creating blog: ${error.message}`);
        return apiResponse(res, 500, false, generateMessage("serverError", "Blog"));
    }
};

// Update a blog by ID
export const updateBlog = async (req, res) => {
    try {
        if (req.body.title) {
            const slug = req.body.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
            const existingBlog = await Blog.findOne({ slug, _id: { $ne: req.params.id } });
            if (existingBlog) {
                logging("warn", `Slug already exists: ${slug}`);
                return apiResponse(res, 400, false, generateMessage("alreadyExists", "Slug"));
            }
            req.body.slug = slug;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedBlog) {
            logging("warn", `Blog not found with ID: ${req.params.id}`);
            return apiResponse(res, 404, false, generateMessage("notFound", "Blog"));
        }
        logging("info", `Blog updated successfully with ID: ${req.params.id}`);
        return apiResponse(res, 200, true, generateMessage("update", "Blog"), updatedBlog);
    } catch (error) {
        logging("error", `Error updating blog: ${error.message}`);
        return apiResponse(res, 500, false, generateMessage("serverError", "Blog"));
    }
};

// Delete a blog by ID
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            logging("warn", `Blog not found with ID: ${req.params.id}`);
            return apiResponse(res, 404, false, generateMessage("notFound", "Blog"));
        }

        // Check if the user is authorized to delete the blog
        if (!req.user.isAdmin && blog.author.toString() !== req.user._id.toString()) {
            logging("warn", `Unauthorized attempt to delete blog with ID: ${req.params.id}`);
            return apiResponse(res, 403, false, generateMessage("unauthorized", "Blog"));
        }

        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        logging("info", `Blog deleted successfully with ID: ${req.params.id}`);
        return apiResponse(res, 200, true, generateMessage("delete", "Blog"), deletedBlog);
    } catch (error) {
        logging("error", `Error deleting blog: ${error.message}`);
        return apiResponse(res, 500, false, generateMessage("serverError", "Blog"));
    }
};