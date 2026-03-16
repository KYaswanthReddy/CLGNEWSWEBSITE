import { validationResult } from 'express-validator';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phoneNumber, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      phoneNumber,
      password,
      role: role || 'student',
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(`Register error: ${error.message}`);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log(`Login attempt for email: ${email}`);

    const user = await User.findOne({ email });

    if (user) {
      console.log(`User found: ${user.email}`);
      const isMatch = await user.matchPassword(password);
      console.log(`Password match: ${isMatch}`);

      if (isMatch) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          token: generateToken(user._id, user.role),
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      console.log(`User not found for email: ${email}`);
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(`Login error: ${error.message}`);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Auth admin & get token
// @route   POST /api/auth/admin-login
// @access  Public
const adminLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log(`Admin login attempt for email: ${email}`);

    const user = await User.findOne({ email });

    if (user) {
      console.log(`User found: ${user.email}, role: ${user.role}`);
      const isMatch = await user.matchPassword(password);
      console.log(`Password match: ${isMatch}`);

      if (user.role === 'admin' && isMatch) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          token: generateToken(user._id, user.role),
        });
      } else if (user.role !== 'admin') {
        console.log(`User is not an admin: ${user.email}`);
        res.status(403).json({ message: 'Not authorized as an admin' });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      console.log(`User not found for admin email: ${email}`);
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(`Admin login error: ${error.message}`);
    res.status(500).json({ message: 'Server error during admin login' });
  }
};

export { registerUser, loginUser, adminLogin };
