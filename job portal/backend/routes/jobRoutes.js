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

router.get("/", getJobs);  
router.get("/:id", getJobById);  
router.put("/:id", authenticateUser, authorizeRecruiter, updateJob);  
router.delete("/:id", authenticateUser, authorizeRecruiter, deleteJob);  
router.post("/:id/apply", authenticateUser, applyJob);  
router.get("/applied-jobs", authenticateUser, getAppliedJobs);

// ✅ Render postJob.ejs page for Recruiters
router.get("/jobs/postJob", (req, res) => {
    console.log("🚀 Rendering postJob.ejs...");
    try {
        res.render("postJob", { message: "Hello from backend!" });
    } catch (error) {
        console.error("❌ Error Rendering postJob.ejs:", error);
        res.status(500).send("EJS Rendering Error");
    }
});





module.exports = router;
