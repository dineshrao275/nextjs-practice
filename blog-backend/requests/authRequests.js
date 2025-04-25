import { check } from 'express-validator';
import generateMessage from '../helpers/message.js';

// Validation rules for user login
export const validateAuthRequest = [
  check('email')
    .isEmail()
    .withMessage(generateMessage('invalidEmail', 'User')),
  check('password')
    .isLength({ min: 6 })
    .withMessage(generateMessage('invalidPassword', 'User')),
];

// Validation rules for user registration
export const validateRegisterRequest = [
  check('name')
    .notEmpty()
    .withMessage(generateMessage('nameRequired', 'User')),
  check('email')
    .isEmail()
    .withMessage(generateMessage('invalidEmail', 'User')),
  check('password')
    .isLength({ min: 6 })
    .withMessage(generateMessage('requiredPassword', 'User')),
  check('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage(generateMessage('passwordMismatch', 'User')),
];
