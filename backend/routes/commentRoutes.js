const express = require("express");
const router = express.Router();

const {createComment} = require("../controllers/commentController")
const { protect } = require("../middleware/authMiddleware");


router.post("/",protect,createComment);

module.exports = router;