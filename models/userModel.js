const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    userId : {type : String, required : true, unique : true},
    username : {type : String, required : true, unique : true},
    dob : {type : Date, required : true},
    referralCode : {type : String},
    passCode : {type : String, required : true},
    role : {type : String, default : "user"}

})

module.exports = mongoose.model("User", userSchema);