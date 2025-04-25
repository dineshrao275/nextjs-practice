import { body } from 'express-validator';
import generateMessage from '../helpers/message.js';
import mongoose from 'mongoose';

// Validation rules for creating a blog
export const validateBlogRequest = [
  body('title')
    .notEmpty()
    .withMessage(generateMessage('titleRequired', 'Blog'))
    .isLength({ min: 5 })
    .withMessage(generateMessage('titleTooShort', 'Blog')),

  body('content')
    .notEmpty()
    .withMessage(generateMessage('contentRequired', 'Blog'))
    .isLength({ min: 20 })
    .withMessage(generateMessage('contentTooShort', 'Blog')),

  body('author')
    .notEmpty()
    .withMessage(generateMessage('authorRequired', 'Blog'))
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(generateMessage('invalidAuthorId', 'Blog')),
];
