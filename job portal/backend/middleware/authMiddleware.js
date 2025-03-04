const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Bearer token

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, No Token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Invalid Token" });
  }
};

let blacklistedTokens = [];

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  if (blacklistedTokens.includes(token)) {
    return res.status(401).json({ message: "Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    console.log("Authenticated User:", req.user); // ✅ Debugging ke liye

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error); // ✅ Debugging ke liye
    res.status(401).json({ message: "Invalid token" });
  }
};


const logoutUser = (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (token) blacklistedTokens.push(token);
  res.json({ message: "Logged out successfully" });
};

const authorizeRecruiter = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({ message: "Access denied. Recruiters only." });
  }
  next();
};


module.exports = { protect, logoutUser, authenticateUser, authorizeRecruiter};
