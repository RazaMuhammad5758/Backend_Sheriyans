const Job = require("../models/Job");

// Create Job
const createJob = async (req, res) => {
  try {
    const { title, description, salary, location, company } = req.body;

    console.log("Request Body:", req.body);  // ✅ Debugging Line

    const job = new Job({ title, description, salary, location, company, postedBy: req.user.id });
    await job.save();

    console.log("Job Created Successfully:", job);  // ✅ Debugging Line

    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error("Create Job Error:", error.message);  // ✅ Error message extract kar raha hai
    console.error("Full Error:", error);  // ✅ Poora error print hoga

    res.status(500).json({ message: "Server Error", error: error.message });  // ✅ Error response me bhejo
  }
};


// Get All Jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job updated successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createJob, getJobs, updateJob, deleteJob, getJobById };
