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

const getSnippets = async (req, res) => {
    try {
        const snippets = await Snippet.find()

        res.status(200).json(snippets);


    } catch (error) {
        return res.status(500).json({ message: error.message });

    }

};


const getSnippetById = async (req, res) => {
    
    try {

        const { id } = req.params;
        const snippet= await Snippet.findById(id)

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

module.exports = { createSnippet, getSnippets, getSnippetById };