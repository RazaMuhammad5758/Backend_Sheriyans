const jwt = require("jsonwebtoken");

let blacklistedTokens = new Map();

// ✅ Unified Authentication Middleware (Protect + Authenticate)
const authenticateUser = (req, res, next) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;

  console.log("🔑 Token Received:", token); // ✅ Debugging

  if (!token) {
    console.log("❌ No Token Provided");
    return res.status(401).json({ message: "Unauthorized - No Token Provided" });
  }

  if (blacklistedTokens.has(token)) {
    console.log("🚫 Token is Blacklisted");
    return res.status(401).json({ message: "Unauthorized - Token is Blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Decoded:", decoded); // ✅ Debugging

    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Invalid Token Error:", error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};


// ✅ Logout User (Blacklist Token)
const logoutUser = (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (token) {
    const expiryTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days expiry
    blacklistedTokens.set(token, expiryTime);
  }
  res.json({ message: "Logged out successfully" });
};

// ✅ Automatic Cleanup for Expired Tokens
setInterval(() => {
  const now = Date.now();
  blacklistedTokens.forEach((expiry, token) => {
    if (expiry < now) {
      blacklistedTokens.delete(token);
    }
  });
}, 60 * 60 * 1000); // Runs every 1 hour

// ✅ Only Recruiters Can Access
const authorizeRecruiter = (req, res, next) => {
  if (!req.user) {
    console.log("❌ No User Found in Request");
    return res.status(401).json({ message: "Unauthorized - No User Found" });
  }

  console.log("👤 User Role:", req.user.role); // ✅ Debugging

  if (req.user.role !== "recruiter") {
    console.log("🚫 Access Denied! Not a Recruiter");
    return res.status(403).json({ message: "Access denied! Recruiters only." });
  }

  console.log("✅ Access Granted to Recruiter");
  next();
};

module.exports = { authenticateUser, logoutUser, authorizeRecruiter };
