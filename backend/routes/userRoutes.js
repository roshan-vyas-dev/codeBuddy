const express = require("express");
const router =express.Router();

const { getUserProfile,getUserSnippets } = require("../controllers/userController");

router.get("/:id",getUserProfile);
router.get("/:id/snippets",getUserSnippets);

module.exports = router;
