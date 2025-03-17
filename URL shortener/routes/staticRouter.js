const express = require('express');
const URL = require('../models/url');
const router = express.Router();
const { restrictToUserLoggedIn } = require('../middlewares/auth');

router.get('/url', restrictToUserLoggedIn, async(req, res)=>{
    if (!req.user) 
        return res.redirect('/login'); // Agar user logged in nahi hai to login page par bhej do
    

    const allURLs = await URL.find({createdBy: req.user._id});

    return    res.render("home", {
        urls: allURLs,
    
    });
});


router.get("/signup", (req, res)=>{
    return res.render("signup")
})
router.get("/login", (req, res)=>{
    return res.render("login")
})



module.exports = router