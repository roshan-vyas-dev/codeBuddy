const express = require("express");
const router = express.Router();

const {createComment,getComments,deleteComment} = require("../controllers/commentController")
const { protect } = require("../middleware/authMiddleware");


router.post("/",protect,createComment);
router.get("/snippet/:id",protect,getComments);
router.delete("/:id",protect,deleteComment);

module.exports = router;