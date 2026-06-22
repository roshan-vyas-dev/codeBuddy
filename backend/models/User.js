const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 20

        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false
        },
        role: {
            type: String,
            enum: ["user", "moderator", "admin"],
            default: "user"
        },
        bio: {
            type: String,
            trim: true,
            default: ""
        },
        profilePic: {
            type: String,
            default: ""
        },
        reputation: {
            type: Number,
            default: 0
        },
        isBlocked: {
            type: Boolean,
            default: false
        },

    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;