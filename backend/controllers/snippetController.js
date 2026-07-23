const Snippet = require("../models/Snippet");
const User = require("../models/User");
const { param } = require("../routes/commentRoutes");

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

const getSnippets = async (req, res) => {
    try {
        const snippets = await Snippet.find().populate("author", "username profilePic");

        res.status(200).json(snippets);


    } catch (error) {
        return res.status(500).json({ message: error.message });

    }

};


const getSnippetById = async (req, res) => {

    try {

        const { id } = req.params;
        const snippet = await Snippet.findById(id).populate("author", "username profilePic");

        if (!snippet) {
            return res.status(404).json({
                message: "Snippet not found"
            });
        }

        res.status(200).json(snippet);




    } catch (error) {

        return res.status(500).json({ message: error.message });


    }
};

const updateSnippet = async (req, res) => {
    try {

        const { id } = req.params;

        const snippet = await Snippet.findById(id)

        if (!snippet) {
            return res.status(404).json({
                message: "Snippet not found"
            });
        }

        if (snippet.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        snippet.title = req.body.title;
        snippet.code = req.body.code;
        snippet.language = req.body.language;

        await snippet.save();

        res.status(200).json(snippet);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


const deleteSnippet = async (req, res) => {

    try {
        const { id } = req.params;

        const snippet = await Snippet.findById(id)

        if (!snippet) {
            return res.status(404).json({
                message: "Snippet not found"
            });
        }

        console.log(req.user);


        if (snippet.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }


        await snippet.deleteOne();

        res.status(200).json({ message: "snippet deleted succesfully" });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const likeSnippet = async (req, res) => {
    try {

        const snippet = await Snippet.findById(req.params.id);

        if (!snippet) {
            return res.status(404).json({
                message: "Snippet not found"
            });
        }

        if (snippet.author.toString() === req.user._id.toString()) {
            return res.status(400).json({
                message: "You cannot like your own snippet"
            });
        }


        const alreadyLiked = snippet.likes.some(
            (id) => id.toString() === req.user._id.toString()
        );


        const user = await User.findById(snippet.author);


        if (alreadyLiked) {

            snippet.likes = snippet.likes.filter(
                (id) => id.toString() !== req.user._id.toString()
            );

            user.reputation = Math.max(0, user.reputation - 1);;

        } else {

            snippet.likes.push(req.user._id);

            user.reputation++;

        }


        await user.save();
        await snippet.save();


        res.json(snippet);


    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const searchSnippets = async (req, res) => {

    try {

        const keyword = req.query.keyword;

        const snippets = await Snippet.find({
            title: {
                $regex: keyword,
                $options: "i"
            }
        }).populate("author", "username profilePic");

        res.json(snippets);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = { createSnippet, getSnippets, getSnippetById, updateSnippet, deleteSnippet, likeSnippet,searchSnippets };