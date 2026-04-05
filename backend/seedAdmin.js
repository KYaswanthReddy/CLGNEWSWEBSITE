import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import connectDB from './config/db.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await Admin.findOne({ email: 'yashwanths19a@gmail.com' });

    if (!adminExists) {
      const admin = new Admin({
        name: 'Yaswanth',
        email: 'yashwanths19a@gmail.com',
        password: 'admin123', // This will be hashed by the pre-save hook
        phoneNumber: '9876543210',
        role: 'admin',
      });

      await admin.save();
      console.log('Seed Admin Created: Yaswanth / yashwanths19a@gmail.com / admin123');
    } else {
      console.log('Admin already exists');
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
