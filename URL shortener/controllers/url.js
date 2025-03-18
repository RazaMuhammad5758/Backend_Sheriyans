const shortid = require('shortid')
const URL = require('../models/url')


async function handleGenerateNewShortURL(req, res) {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "URL is required" });

    const shortID = shortid.generate().substring(0, 4);
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitedHistory: [],
        createdBy: req.user._id,  // Ensure user is set
    });

    return res.redirect(`/url?id=${shortID}`);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({ 
        totalClicks: result.visitedHistory.length,
        analitics: result.visitedHistory

    })
    
    
}

async function handleDeleteURL(req, res) {
    const shortId = req.params.shortId;
    await URL.findOneAndDelete({ shortId });
    res.redirect('/url');  // After deletion, redirect back to the list of URLs
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleDeleteURL,
}