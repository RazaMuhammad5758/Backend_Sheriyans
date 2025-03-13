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
router.post("/post", authenticateUser, authorizeRecruiter, createJob);  

// ✅ Job API Endpoints
router.get("/", getJobs);  
router.get("/:id", getJobById);  
router.put("/:id", authenticateUser, authorizeRecruiter, updateJob);  
router.delete("/:id", authenticateUser, authorizeRecruiter, deleteJob);  
router.post("/:id/apply", authenticateUser, applyJob);  
router.get("/applied-jobs", authenticateUser, getAppliedJobs);

// // ✅ Render postJob.ejs page for Recruiters
router.get("/postjob", authenticateUser, authorizeRecruiter, (req, res) => {
    try {
        console.log("🚀 Recruiter Accessing postJob.ejs...");
        res.render("postjob");
    } catch (error) {
        console.error("❌ Error Rendering postJob.ejs:", error);
        res.status(500).render("error", { message: "Failed to load Post Job page" }); // ✅ Fix
    }
});


module.exports = router;
