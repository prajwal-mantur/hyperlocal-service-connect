const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res)=> {
    res.send("Home Page");
});



app.get("/api/health", (req, res)=>{
    res.status(200).json({
        status : "ok",
        message: "HyperLocal Service Connect API is running"
    })
});

app.listen(port, ()=> {
    console.log(`Server running on the port ${port}`);
});