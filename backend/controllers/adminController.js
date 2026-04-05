import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';

// @desc    Add new admin (Admin only)
// @route   POST /api/admins
// @access  Private/Admin
const addAdmin = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const admin = await Admin.create({
      name,
      email: email.toLowerCase(),
      password,
      phoneNumber,
    });

    if (admin) {
      res.status(201).json({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      });
    } else {
      res.status(400).json({ error: 'Invalid admin data' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Change Password (Admin only)
// @route   PUT /api/admins/change-password
// @access  Private/Admin
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    const admin = await Admin.findById(req.user.id);

    if (admin) {
      const isMatch = await admin.matchPassword(oldPassword);

      if (!isMatch) {
        return res.status(401).json({ error: 'Incorrect old password' });
      }

      admin.password = newPassword;
      await admin.save();

      res.status(200).json({ message: 'Password updated successfully' });
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addAdmin, changePassword };
