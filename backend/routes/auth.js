const express = require("express");
const router = express.Router();
const User = require("../models/User");


// REGISTER - Create a new user

router.post('/register', async (req, res) => {

    const { username, email, password } = req.body;

    // check if User alreay exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
    }

    // create new User
    const user = new User({username,email,password});
    await user.save();

    res.status(201).json({message:"User created successfully",username:user.username})

    try {

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
});

module.exports=router;