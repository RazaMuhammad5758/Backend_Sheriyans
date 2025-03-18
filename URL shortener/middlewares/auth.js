const { getUser} = require("../service/auth")
const SECRET_KEY = "your_secret_key";


async function restrictToUserLoggedIn(req, res, next){
    const userUid = req.cookies?.uid;
    console.log("User UID from Cookie:", userUid);  // Debugging ke liye

    if(!userUid) return res.redirect('/login')
        
    const user = await getUser(userUid);  // Ensure ke await use ho raha ho
    console.log("Fetched User:", user);  // Debugging ke liye
    
    if(!user) return res.redirect('/login')
    
    req.user = user;
    next();
}


async function checkAuth(req, res, next){
    const userUid = req.cookies?.uid;
    
        
    const user = getUser(userUid);
   
    
    req.user = user
    next();
}

module.exports = {
    restrictToUserLoggedIn,
    checkAuth,
}