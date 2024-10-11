// Import mongoose module:
const mongoose = require("mongoose");
// Requiring process to use the exit method
const process = require("process");

const dbURI =
  "mongodb+srv://user1:mxRT34RF4543dmRF@cluster0.6y8ma.mongodb.net/";
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log("MongiDB connection error: ", error.message);

    // To exit the current process with failure.
    process.exit(1);
  }
};

module.exports = connectDB;
