const mongoose = require("mongoose");

const workerProfileSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        unique : true
    },
    skills: {
        type : [String],
        required : true,
        validate : {
            validator : skills => skills.length > 0,
            message : "At least one skill is required"
        }
    },
    experience : {
        type : Number,
        min : 0,
        default : 0
    },
    bio : {
        type : String,
        required :true,
        trim : true
    },
    location : {
       city : {
        type : String,
        required : true,
        trim : true
       },
       state : {
        type: String,
        required :true,
        trim : true
       },
       pincode : {
        type: String,
        required: true,
        trim  :true
       }
},
    hourlyRate : {
        type : Number,
        required: true,
        min : 0
    },
    isAvailable : {
        type : Boolean,
        default : true
    },
    rating : {
        type :  Number,
        min: 0,
        max : 5,
        default : 0
    },
    
}, {timestamps : true});


const WorkerProfile = mongoose.model('WorkerProfile', workerProfileSchema);
module.exports = WorkerProfile;