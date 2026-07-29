const User = require("../models/User");
const Snippet = require("../models/Snippet");
const Comment = require("../models/Comment");

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

const unblockUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "admin") {
            return res.status(400).json({
                message: "Admin cannot be unblocked"
            });
        }

        if (!user.isBlocked) {
            return res.status(400).json({
                message: "User is already unblocked"
            });
        }

        user.isBlocked = false;
        await user.save();

        res.status(200).json({
            message: "User unblocked successfully"
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "admin") {
            return res.status(400).json({ message: "Admin cannot be deleted" })
        }


        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "User deleted successfully"
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const deleteSnippet = async (req, res) => {

    try {
        const snippet = await Snippet.findById(req.params.id);

        if (!snippet) {
            return res.status(404).json({ message: "Snippet not found" });
        }

        await Comment.deleteMany({ snippet: req.params.id });

        await Snippet.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Snippet deleted successfully" });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const deleteComment = async (req, res) => {

    try {

        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        await Comment.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Comment deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getAdminDashboard = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalSnippets = await Snippet.countDocuments();

        const totalComments = await Comment.countDocuments();


        res.status(200).json({
            totalUsers,
            totalSnippets,
            totalComments
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getAllAdminSnippets = async (req, res) => {

    try {

        const snippets = await Snippet.find()
            .populate("author", "username email");


        res.status(200).json(snippets);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


const getAllAdminComments = async (req, res) => {

    try {

        const comments = await Comment.find()
            .populate("author", "username")
            .populate("snippet", "title");


        res.status(200).json(comments);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = { getAllUsers, blockUser, unblockUser, deleteUser, deleteSnippet,deleteComment,getAdminDashboard,getAllAdminSnippets,getAllAdminComments }