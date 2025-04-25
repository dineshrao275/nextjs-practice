import Category from "../schemas/categorySchema.js";
import apiResponse from "../helpers/apiResponseHelper.js";
import { logging } from "../helpers/commonHelper.js";
import generateMessage from "../helpers/message.js";

/**
 * Get all categories
 */
export const getAllCategories = async (req, res) => {
  try {
    logging("info", "Fetching all categories", {
      method: req.method,
      url: req.originalUrl,
    });

    const categories = await Category.find();

    return apiResponse(
      res,
      200,
      true,
      generateMessage("read", "Categories"),
      categories
    );
  } catch (error) {
    logging("error", "Error fetching categories", {
      error: error.message,
      method: req.method,
      url: req.originalUrl,
    });
    return apiResponse(
      res,
      500,
      false,
      generateMessage("serverError", "Categories")
    );
  }
};

/**
 * Get category by ID
 */
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    logging("info", `Fetching category with ID: ${id}`, {
      method: req.method,
      url: req.originalUrl,
    });

    const category = await Category.findById(id);

    if (!category) {
      return apiResponse(
        res,
        404,
        false,
        generateMessage("notFound", "Category")
      );
    }

    return apiResponse(
      res,
      200,
      true,
      generateMessage("read", "Category"),
      category
    );
  } catch (error) {
    logging("error", "Error fetching category by ID", {
      error: error.message,
      method: req.method,
      url: req.originalUrl,
    });
    return apiResponse(
      res,
      500,
      false,
      generateMessage("serverError", "Category")
    );
  }
};

/**
 * Create a new category
 */
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    logging("info", "Creating new category", {
      method: req.method,
      url: req.originalUrl,
    });

    const newCategory = new Category({ name });
    await newCategory.save();

    return apiResponse(
      res,
      201,
      true,
      generateMessage("create", "Category"),
      newCategory
    );
  } catch (error) {
    logging("error", "Error creating category", {
      error: error.message,
      method: req.method,
      url: req.originalUrl,
    });
    return apiResponse(
      res,
      500,
      false,
      generateMessage("serverError", "Category")
    );
  }
};

/**
 * Update category
 */
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    logging("info", `Updating category with ID: ${id}`, {
      method: req.method,
      url: req.originalUrl,
    });

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return apiResponse(
        res,
        404,
        false,
        generateMessage("notFound", "Category")
      );
    }

    return apiResponse(
      res,
      200,
      true,
      generateMessage("update", "Category"),
      updatedCategory
    );
  } catch (error) {
    logging("error", "Error updating category", {
      error: error.message,
      method: req.method,
      url: req.originalUrl,
    });
    return apiResponse(
      res,
      500,
      false,
      generateMessage("serverError", "Category")
    );
  }
};

/**
 * Delete category
 */
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    logging("info", `Deleting category with ID: ${id}`, {
      method: req.method,
      url: req.originalUrl,
    });

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return apiResponse(
        res,
        404,
        false,
        generateMessage("notFound", "Category")
      );
    }

    return apiResponse(res, 200, true, generateMessage("delete", "Category"));
  } catch (error) {
    logging("error", "Error deleting category", {
      error: error.message,
      method: req.method,
      url: req.originalUrl,
    });
    return apiResponse(
      res,
      500,
      false,
      generateMessage("serverError", "Category")
    );
  }
};
