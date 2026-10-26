const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        unique : true,
        trim : true,
        lowercase : true,
        required : [true, "email is required"],
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    passwordHash : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["customer", "worker", "admin"],
        default : "customer"
    },
    phone : {
        type : String,
        required : true,
        trim  :true
    }
},
{timestamps : true});

const User = mongoose.model("User", userSchema);

module.exports = User;
