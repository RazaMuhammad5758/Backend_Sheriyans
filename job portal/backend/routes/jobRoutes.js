const express = require("express");
const { 
    createJob, 
    getJobs, 
    updateJob, 
    deleteJob, 
    getJobById, 
    applyJob, 
    getAppliedJobs 
} = require("../controllers/jobController");

const { authenticateUser, authorizeRecruiter } = require("../middleware/authMiddleware");
const Job = require("../models/job");  //  Import Job Model

const router = express.Router();

//  Route to Post a Job (Only Recruiters Can Post)
router.post("/jobs/apply", async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, error: "User not logged in" });
        }

        const { jobId, resume } = req.body;
        const userId = req.user._id; // Authenticated User ID

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, error: "Job not found" });
        }

        await AppliedJob.create({ jobId, userId, resume });

        res.json({ success: true, message: "Job application submitted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});


//  Applied Jobs Route
router.get("/applied-jobs", authenticateUser, getAppliedJobs);  

//  Job API Endpoints
router.get("/", getJobs);  
router.get("/:id", getJobById);  
router.put("/:id", authenticateUser, authorizeRecruiter, updateJob);  

//  Only Job Owner Can Delete
router.delete("/:id", authenticateUser, authorizeRecruiter, async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });

        if (job.postedBy.toString() !== req.user.userId) {  
            return res.status(403).json({ message: "You can only delete your own job" });
        }

        await job.deleteOne(); 
        res.json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

//  Apply for Job
const Application = require("../models/Application");

router.post("/apply", async (req, res) => {
    try {
        const { jobId, name, email, resume } = req.body;

        if (!jobId || !name || !email || !resume) {
            return res.json({ success: false, error: "All fields are required" });
        }

        const newApplication = new Application({ jobId, name, email, resume });
        await newApplication.save();

        res.json({ success: true });
    } catch (error) {
        console.error("Error saving application:", error);
        res.json({ success: false, error: error.message });
    }
});

// Render postJob.ejs page for Recruiters
router.get("/postjob", authenticateUser, authorizeRecruiter,  (req, res) => {
    console.log("Serving Post Job Page");
    res.render("postjob");
});

module.exports = router;
