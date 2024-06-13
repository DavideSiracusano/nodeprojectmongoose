const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const KEY = process.env.DB_KEY;
    await mongoose.connect(KEY, { dbName: "Education" });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
