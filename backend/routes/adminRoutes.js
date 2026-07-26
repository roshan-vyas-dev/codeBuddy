const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const { getAllUsers,blockUser } = require("../controllers/adminController");


router.get("/users", protect, adminOnly, getAllUsers);
router.patch("/users/:id/block",protect,adminOnly,blockUser)


module.exports=router;