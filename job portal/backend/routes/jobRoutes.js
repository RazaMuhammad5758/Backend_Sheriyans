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

const router = express.Router();

// ✅ Route to Post a Job (Only Recruiters Can Post)
// router.post("/post", authenticateUser, authorizeRecruiter, createJob);  
router.post("/post", authenticateUser, authorizeRecruiter, async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "Title and Description are required" });
        }

        const newJob = new Job({
            title,
            description,
            postedBy: req.user.id, // Ensure `req.user` is available
        });

        await newJob.save();
        res.status(201).json({ message: "Job posted successfully!", job: newJob });
    } catch (error) {
        console.error("Error posting job:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


// ✅ Applied Jobs Route (Fixed Order Issue)
router.get("/applied-jobs", authenticateUser, getAppliedJobs);  

// ✅ Job API Endpoints
router.get("/", getJobs);  
router.get("/:id", getJobById);  
router.put("/:id", authenticateUser, authorizeRecruiter, updateJob);  

// ✅ Fix: Only Job Owner Can Delete
router.delete("/:id", authenticateUser, authorizeRecruiter, async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });

        if (job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only delete your own job" });
        }

        await job.remove();
        res.json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// ✅ Apply for Job
router.post("/:id/apply", authenticateUser, applyJob);  

// ✅ Render postJob.ejs page for Recruiters
router.get("/postjob", authenticateUser, authorizeRecruiter, (req, res) => {
    try {
        console.log("🚀 Recruiter Accessing postJob.ejs...");
        res.render("postjob");  // ✅ Ensure file is inside /views
    } catch (error) {
        console.error("❌ Error Rendering postJob.ejs:", error);
        res.status(500).json({ message: "Server Error", error: error.toString() });
    }
});




module.exports = router;
