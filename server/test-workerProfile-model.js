require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./models/user");
const WorkerProfile = require("./models/workerProfile");

async function testWorkerProfileModel (){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
        let user = await User.findOne({email : "testuser@example.com"});
        const testWorkerProfile = new WorkerProfile({
            userId : user._id,
            skills : ["plumber", "electrician"],
            experience : 2,
            bio : "Hello, this is Prajwal. I have been working as a tasker since 4 years. I have a 2 years of experience, if you assign me  task i will definitely give my best and complete it",
            location : {
                city : "Belagavi",
                state : "Karnataka",
                pincode : 1234
            },
            hourlyRate : 2,
            // isAvailable : true,
            rating : 3
        });
        await testWorkerProfile.validate();
        console.log("WorkerProfile validation successful");
        console.log("userId", testWorkerProfile.userId);
        console.log("Bio -- ", testWorkerProfile.bio);
        console.log("location -- city =>", testWorkerProfile.location.city, "state =>", testWorkerProfile.location.state, "pincode =>", testWorkerProfile.location.pincode, "rating =>", testWorkerProfile.rating, "Experience =>", testWorkerProfile.experience, "isAvailable", testWorkerProfile.isAvailable);
    } catch(error) {
        console.log("Error Occured", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

testWorkerProfileModel();