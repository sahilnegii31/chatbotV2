const mongoose = require('mongoose');
const dotenv = require('dotenv');

async function connectDB(){
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("DATABASE CONNECTED SUCCESSFULLY");
}
module.exports = connectDB;