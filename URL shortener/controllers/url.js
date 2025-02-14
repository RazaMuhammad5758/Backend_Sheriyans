const shortid = require('shortid')
const URL = require('../models/url')


async function handleGenerateNewShortURL(req, res) {
    const body = req.body
    if(!body.url)  return res.status(400).json({error: "URL is required"})
    const shortId = shortid(8);
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitedHistory: [],

    })
    return res.json({ id: shortID})
}

async function handleCreate(req, res) {
    
    
}

module.exports = {
    handleGenerateNewShortURL,
}