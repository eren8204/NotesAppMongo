const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require('dotenv').config();
//import auth url from env
const authUrl = process.env.MONGO_AUTH_URL;
app.use(cors())
app.use(helmet());
app.use(express.json());
app.use((req,res,next)=>{
    console.log("HTTP Method: ", req.method, "URL: ", req.url, "Body: ", req.body);
    next();
});
app.use("/user", userRouter);
app.use("/note", noteRouter);
mongoose.connect(authUrl)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT_NUMBER, () =>{
    console.log("Server is running on port 5000");
});
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });