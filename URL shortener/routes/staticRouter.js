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

router.get("/signup", (req, res)=>{
    return res.render("signup")
})
router.get("/login", (req, res)=>{
    return res.render("login")
})



module.exports = router