const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const { authenticateUser } = require("./middleware/authMiddleware");

dotenv.config(); // ✅ Duplicate config hataya
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ EJS Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Static Folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ Global Middleware: `user` ko har page me access dena
app.use((req, res, next) => {
    res.locals.user = req.user || null; // `res.locals` se EJS me available hoga
    next();
});

// ✅ Routes Setup
app.use("/api", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes); // ✅ Fixed: API ke liye uncomment
app.use("/jobs", jobRoutes); // ✅ Fixed: EJS rendering ke liye uncomment

// ✅ Home Page Route
app.get("/", (req, res) => {
    res.render("index", { title: "Job Portal" });
});

// ✅ Auth Routes
app.get("/login", (req, res) => res.render("login", { title: "Login" }));
app.get("/register", (req, res) => res.render("register", { title: "Register" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
