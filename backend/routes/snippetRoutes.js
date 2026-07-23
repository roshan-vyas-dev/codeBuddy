const express = require("express");
const router = express.Router();

const { createSnippet, getSnippets, getSnippetById, updateSnippet, deleteSnippet,likeSnippet,searchSnippets } = require("../controllers/snippetController");
const { reviewSnippet } = require("../controllers/aiController")
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getSnippets);
router.get("/search", protect, searchSnippets);
router.get("/:id", protect, getSnippetById);
router.post("/", protect, createSnippet);
router.put("/:id", protect, updateSnippet);
router.delete("/:id", protect, deleteSnippet);
router.post("/:id/review", protect, reviewSnippet);
router.put("/:id/like", protect, likeSnippet);



module.exports = router
