const express = require('express');
const URL = require('../models/url');
const router = express.Router();

router.get('/url', async(req, res)=>{
    const allURLs = await URL.find({});
    const generatedId = req.query.id; // Get the ID from query string
    
    res.render("home",{
        urls: allURLs,
        id: generatedId // Pass generated ID to the view
    });
});



module.exports = router