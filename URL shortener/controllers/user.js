const bcrypt = require('bcrypt');  // Password encryption ke liye
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        name,
        email,
        password: hashedPassword // ✅ Save hashed password
    });

    return res.redirect("/login"); // ✅ Redirect to login page after signup
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.render("login", { error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.render("login", { error: "Invalid Username or Password" });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId, { httpOnly: true, secure: false }); 
    return res.redirect("/url");
}

module.exports = {
    handleUserSignup,
    handleUserLogin
};
