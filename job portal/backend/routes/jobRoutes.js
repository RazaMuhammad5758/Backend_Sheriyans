const express = require("express");
const { createJob, getJobs, updateJob, deleteJob, getJobById } = require("../controllers/jobController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateUser, createJob);
router.get("/", getJobs);
router.get("/:id", getJobById); // New route added
router.put("/:id", authenticateUser, updateJob);
router.delete("/:id", authenticateUser, deleteJob);

module.exports = router;
