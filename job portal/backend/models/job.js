const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number },
    description: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Applied users
  },
  { timestamps: true }
);

//  Ensure Model is Not Re-Declared
const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

module.exports = Job;

