const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    snippet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Snippet",
        required: true
    },
    helpfulCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


module.exports = mongoose.model("Comment", commentSchema);

