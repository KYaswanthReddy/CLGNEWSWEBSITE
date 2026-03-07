import express from 'express';
import { check } from 'express-validator';
const router = express.Router();
import {
  registerUser,
  loginUser,
  adminLogin,
} from '../controllers/authController.js';

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phoneNumber', 'Please enter a valid phone number (10 digits)').isLength({
      min: 10,
      max: 10,
    }),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  registerUser
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginUser
);

router.post(
  '/admin-login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  adminLogin
);

export default router;
