const Snippet = require("../models/Snippet");

const createSnippet = async (req, res) => {
    try {

        const { title, code, language } = req.body;

        const snippet = await Snippet.create({
            title,
            code,
            language,
            author: req.user._id
        });

        res.status(201).json(snippet);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};

module.exports = { createSnippet };