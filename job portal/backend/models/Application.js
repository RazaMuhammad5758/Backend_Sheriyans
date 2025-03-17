const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    jobId: String,
    name: String,
    email: String,
    resume: String,
    appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", applicationSchema);
