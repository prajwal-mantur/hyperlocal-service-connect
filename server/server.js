require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());


const authRoutes = require("./routes/authRoutes");
const { isLoggedIn } = require("./middleware/authMiddleware");
const { allowedRoles } = require("./middleware/roleMiddleware");
app.get("/", (req, res)=> {
    res.send("Home Page");
});


app.get("/api/health", (req, res)=>{
    res.status(200).json({
        status : "ok",
        message: "HyperLocal Service Connect API is running"
    })
});


app.get("/api/db-health", (req, res)=> {
    const isConnected = mongoose.connection.readyState === 1
    res.status(isConnected ? 200 : 503).json({
        database : isConnected ? "connected" : "Not Connected"
    });
})

const startServer = async ()=>{
    try {
        await connectDB();
        app.listen(port, ()=> {
            console.log(`Server running on the port ${port}`);
        });
    } catch(error) {
        console.log("Failed to Start Server", error.message);
        process.exit(1);
    }
}

app.use("/api/auth", authRoutes);
app.use("api/auth", authRoutes);


// Code for testing the role based authorization

// app.use("/auth/test-role", isLoggedIn, allowedRoles(["admin", "customer"]), (req, res)=>{
//     return res.status(200).json({
//         success : "U are authorized person"
//     });
// });

startServer();

