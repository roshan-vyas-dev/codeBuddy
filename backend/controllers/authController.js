const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {

    const { username, email, password } = req.body;


    const userExists = await User.findOne({
        $or: [
            { email },
            { username }
        ]
    });

    const user = await User.create({
        username,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        throw new Error("Invalid user data");
    }
};



const loginUser = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
    });

};


const getUserProfile = async (req, res) => {
  res.json(req.user);
};


module.exports = { registerUser, loginUser,getUserProfile };
