require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./config/db")


const PORT = process.env.PORT || 5000;

connectDB();



app.get("/",(req,res)=>{
    res.send("Welcome to codeBuddy API")
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);

})