const Comment = require("../models/Comment");
const Snippet = require("../models/Snippet");

const createComment = async (req, res) => {

    try {

        const { snippet, text } = req.body;

        const snippetData = await Snippet.findById(snippet);

        if (!snippetData) {
            return res.status(404).json({ message: "Snippet not found" })
        }

        const comment = await Comment.create({
            author: req.user._id,
            snippet,
            text
        })

        res.status(201).json(comment)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const getComments = async (req, res) => {
    try {
        const { id } = req.params;

        const comments = await Comment.find({ snippet: id })
            .populate("author", "username");

        res.status(200).json(comments)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createComment, getComments };

