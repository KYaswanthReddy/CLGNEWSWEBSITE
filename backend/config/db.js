import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/college-news';
    
    if (!process.env.MONGO_URI) {
      console.warn('⚠️ WARNING: MONGO_URI is not defined in .env. Falling back to LOCAL database.');
      console.warn('If you are using Atlas, please check your .env file in the /backend directory.');
    }

    const conn = await mongoose.connect(dbUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Connection Error: ${error.message}`);
    console.error('Make sure MongoDB is running locally or your Atlas URI is correct.');
    process.exit(1);
  }
};

export default connectDB;
