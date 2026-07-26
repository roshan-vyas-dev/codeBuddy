const User = require("../models/User");

const getAllUsers = async (req, res) => {

    try {

        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


const blockUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.role === "admin") {
            return res.status(400).json({
                message: "Admin cannot be blocked"
            });
        }

        if (user.isBlocked) {
            return res.status(400).json({
                message: "User is already blocked"
            });
        }

        user.isBlocked = true;
        await user.save();

        res.status(200).json({
            message: "User blocked successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = { getAllUsers, blockUser }