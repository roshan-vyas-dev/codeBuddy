const express = require("express");
const router = express.Router();

const { createSnippet, getSnippets, getSnippetById, updateSnippet, deleteSnippet } = require("../controllers/snippetController");
const { reviewSnippet } = require("../controllers/aiController")
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getSnippets);
router.get("/:id", protect, getSnippetById);
router.post("/", protect, createSnippet);
router.put("/:id", protect, updateSnippet);
router.delete("/:id", protect, deleteSnippet);
router.post("/:id/review", protect, reviewSnippet);



module.exports = router
