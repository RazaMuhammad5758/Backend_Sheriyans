const express = require('express')
const router = express.Router()
const {handleUserSignup, handleUserLogin } = require('../controllers/user')

router.post('/', handleUserSignup)
router.post('/login', handleUserLogin)
router.get('/login', (req, res) => {
    res.render("login", { error: "" }); // ✅ Default error pass kar diya
});
router.get('/signup', (req, res) => {
    res.render("signup", { error: "" }); // ✅ Signup page show karne ka route
});

router.get('/logout', (req, res) => {
    res.clearCookie("uid"); // ✅ Remove cookie
    return res.redirect('/login');
});



module.exports = router