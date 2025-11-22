// config/mongodb.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // This will throw a clear error if MONGO_URI is missing
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env file');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host} SUCCESS`);
  } catch (error) {
    console.error('Database connection failed:'.red, error.message);
    process.exit(1);
  }
};

export default connectDB;