const express = require("express");
const { registerUser, loginUser, updateProfile, changePassword, getProfile } = require("../controllers/authController");
const { authenticateUser, logoutUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateUser, getProfile); // ✅ Fix: GET Profile Route Added
router.put("/profile", authenticateUser, updateProfile);
router.put("/change-password", authenticateUser, changePassword);
router.post("/logout", authenticateUser, logoutUser);

module.exports = router;
