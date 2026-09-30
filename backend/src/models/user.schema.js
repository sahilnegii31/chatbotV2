const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type : String,
        unique : true,
        required : true,
    },
    pass : {
        type : String,
        required : true,
    }
},{
    timestamps: true
})
const user = mongoose.model('user' , userSchema);
module.exports = user;