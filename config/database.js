import mongoose from 'mongoose';  // To be able to connect with Mongoose 

let connected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true);  // strictQuery to ensure that only fields that are specified in the schema will be saved to the db

  // If the database is already connected, don't connect again
  if (connected) {
    console.log('MongoDB is already connected...');
    return;
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log('MongoDB connected...');
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
