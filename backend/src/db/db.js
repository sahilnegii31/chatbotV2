const mongoose = require('mongoose');

async function connectDB() {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in .env");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DATABASE CONNECTED SUCCESSFULLY");
}

module.exports = connectDB;