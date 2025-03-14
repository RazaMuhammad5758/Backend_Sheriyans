const express = require("express");
const {
  registerUser,
  loginUser,
  updateProfile,
  changePassword,
  getProfile,
} = require("../controllers/authController");
const {
  authenticateUser,
  logoutUser,
  authorizeRecruiter,
} = require("../middleware/authMiddleware");
const { createJob } = require("../controllers/jobController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/postjob", authenticateUser, authorizeRecruiter, createJob); // ✅ FIXED
router.get("/profile", authenticateUser, getProfile); 
router.put("/profile", authenticateUser, updateProfile);
router.put("/change-password", authenticateUser, changePassword);
router.post("/logout", authenticateUser, logoutUser);

module.exports = router;
