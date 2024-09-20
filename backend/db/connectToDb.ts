import mongoose from 'mongoose';

// Database not connected at the moment, double check credentials

const connectToDb = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('[mongodb] Connected to MongoDB');
  } catch (error) {
    console.log('[mongodb] Error connecting to MongoDB:', error);
  }
};

export default connectToDb;
