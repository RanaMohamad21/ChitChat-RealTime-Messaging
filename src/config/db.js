// Import mongoose module:
const mongoose = require("mongoose");
require("dotenv").config();

// Requiring process to use the exit method
const process = require("process");



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log("MongiDB connection error: ", error.message);

    // To exit the current process with failure.
    process.exit(1);
  }
};

module.exports = connectDB;
