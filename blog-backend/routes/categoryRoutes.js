import express from 'express';
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController.js';
import authenticate, { isAdmin } from '../middlewares/authMiddleware.js';

const categoryRoutes = express.Router();

categoryRoutes.get('/', getAllCategories);
categoryRoutes.get('/:id',[authenticate,isAdmin], getCategoryById);
categoryRoutes.post('/',[authenticate,isAdmin], createCategory);
categoryRoutes.put('/:id',[authenticate,isAdmin], updateCategory);
categoryRoutes.delete('/:id',[authenticate,isAdmin], deleteCategory);

export default categoryRoutes;