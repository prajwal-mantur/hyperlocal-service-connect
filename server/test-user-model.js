
require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/user");

async function testUserModel() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        const testUser = new User({
            username: "testuser123",
            email: `testuser${Date.now()}@example.com`,
            passwordHash: "temporary-test-hash",
            phone: "9876543210"
        });

        await testUser.validate();

        console.log("User model validation successful!");
        console.log("Default role:", testUser.role);
        console.log("Timestamps enabled:", testUser.schema.options.timestamps);

    } catch (error) {
        console.error("Test failed:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

testUserModel();
