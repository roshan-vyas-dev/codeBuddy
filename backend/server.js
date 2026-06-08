require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// import models
const User=require('./models/User')


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected succesfully");

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });

    })
    .catch((error) => {
        console.log("MongoDb conection failed:", error);
    });