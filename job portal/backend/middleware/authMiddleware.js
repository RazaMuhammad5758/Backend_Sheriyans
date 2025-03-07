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
  const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies.token;
  
  if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;  // ✅ `req.user` set karo
      console.log("User authenticated:", req.user); // ✅ Debugging
      next();
  } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({ message: "Invalid Token" });
  }
};



const logoutUser = (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (token) blacklistedTokens.push(token);
  res.json({ message: "Logged out successfully" });
};

const authorizeRecruiter = (req, res, next) => {
  if (!req.user) {
      return res.status(401).json({ message: "Unauthorized - No User Found" });
  }

  if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Access denied! Recruiters only." });
  }

  console.log("Recruiter verified:", req.user.role); // ✅ Debugging
  next();
};



module.exports = { protect, logoutUser, authenticateUser, authorizeRecruiter};
