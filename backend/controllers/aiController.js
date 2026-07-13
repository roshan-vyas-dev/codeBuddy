const Snippet = require("../models/Snippet");
const { reviewCode } = require("../services/aiService");



const reviewSnippet = async (req, res) => {

    try {
        const { id } = req.params;
        const snippet = await Snippet.findById(id);

        if (!snippet) {
            return res.status(404).json({ message: "snippet not found" })
        }

        if (snippet.aiReview) {
            return res.status(200).json({
                review: snippet.aiReview
            });
        }

        const review = await reviewCode(
            snippet.language,
            snippet.code
        );

        snippet.aiReview = review;



        await snippet.save();



        res.status(200).json({
            message: "AI review generated successfully",
            review: snippet.aiReview
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports = { reviewSnippet }