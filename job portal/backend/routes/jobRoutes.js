const express = require("express");
const { createJob, getJobs, updateJob, deleteJob, getJobById, applyJob } = require("../controllers/jobController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateUser, createJob);
router.get("/", getJobs);
router.get("/:id", getJobById); // New route added
router.put("/:id", authenticateUser, updateJob);
router.delete("/:id", authenticateUser, deleteJob);
router.post("/:id/apply", authenticateUser, applyJob);
router.get("/view", async (req, res) => {
    try {
        const jobs = await getJobs();
        res.render("jobs", { title: "All Jobs", jobs });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;
