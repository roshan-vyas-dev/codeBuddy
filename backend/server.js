require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db")



const authRoutes=require("./routes/authRoutes");
const snippetRoutes=require("./routes/snippetRoutes");





connectDB();

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/auth",authRoutes);
app.use("/api/snippets",snippetRoutes)

const PORT = process.env.PORT || 5000;



app.get("/",(req,res)=>{
    res.send("Welcome to codeBuddy API")
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);

})