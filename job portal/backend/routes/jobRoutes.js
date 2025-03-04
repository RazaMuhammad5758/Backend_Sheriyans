const express = require("express");
const { createJob, getJobs, updateJob, deleteJob, getJobById, applyJob, getAppliedJobs } = require("../controllers/jobController");
const { authenticateUser, authorizeRecruiter } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateUser, authorizeRecruiter, createJob); // 🔥 Recruiters Only  
router.get("/", getJobs);  
router.get("/:id", getJobById);  
router.put("/:id", authenticateUser, authorizeRecruiter, updateJob);  
router.delete("/:id", authenticateUser, authorizeRecruiter, deleteJob);  
router.post("/:id/apply", authenticateUser, applyJob);  
router.get("/applied-jobs", authenticateUser, getAppliedJobs);
router.get("/post", (req, res) => {
    res.render("postJob"); // postJob.ejs file honi chahiye views folder mein
});


module.exports = router;
