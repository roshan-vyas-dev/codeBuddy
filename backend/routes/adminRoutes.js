const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const { getAllUsers,blockUser,unblockUser } = require("../controllers/adminController");


router.get("/users", protect, adminOnly, getAllUsers);
router.patch("/users/:id/block",protect,adminOnly,blockUser)
router.patch("/users/:id/unblock",protect,adminOnly,unblockUser)


module.exports=router;