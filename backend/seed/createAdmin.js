require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");
const User = require("../models/User");



const createAdmin = async () => {
    try {
        await connectDB();

        const adminExists = await User.findOne({
            email: process.env.ADMIN_EMAIL
        });

        if (adminExists) {
            console.log("Admin already exists.");
            return;
        }


        await User.create({
            username: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: "admin"
        });

        console.log("Admin created successfully.");


    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.connection.close();
    }
};

createAdmin();