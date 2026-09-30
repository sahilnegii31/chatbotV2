const { connect } = require("mongoose");
const app = require("./src//app");
const  connectDB = require("./src/db/db");
require("dotenv").config();
 //testing commit

app.listen("3000" , () => {
    connectDB(); 
    console.log("Server is running on PORT 3000");
})