const express = require("express");
const router = express.Router();

const {createSnippet} = require("../controllers/snippetController");
const {protect}= require("../middleware/authMiddleware");

router.post("/",protect,createSnippet)


module.exports=router
