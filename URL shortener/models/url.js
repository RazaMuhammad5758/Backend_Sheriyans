const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true },
    redirectUrl: { type: String, required: true },
    visitedHistory: [{ timestamp: { type: Date, default: Date.now } }]
}, {timestamps: true});

const URL = mongoose.model("URL", urlSchema);  // ✅ Correct Model Export

module.exports = URL;  // ✅ Make sure this is correctly exported
