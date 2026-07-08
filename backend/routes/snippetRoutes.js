const express = require("express");
const router = express.Router();

const { createSnippet, getSnippets, getSnippetById, updateSnippet, deleteSnippet } = require("../controllers/snippetController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getSnippets);
router.get("/:id", getSnippetById);
router.post("/", protect, createSnippet);
router.put("/:id", protect, updateSnippet);
router.delete("/:id", protect, deleteSnippet);



module.exports = router
