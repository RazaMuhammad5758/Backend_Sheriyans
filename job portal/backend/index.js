const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Yeh zaroor hona chahiye
app.use(express.urlencoded({ extended: true })); // Yeh bhi add karo

// EJS Set Up
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 

// Static Folder (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));

// Home Route
app.get("/", (req, res) => {
    res.render("index", { title: "Job Portal", user: null }); 
});
// login Route
app.get("/login", (req, res) => {
    res.render("login", { title: "login", user: null }); 
});
// register Route
app.get("/register", (req, res) => {
    res.render("register", { title: "register", user: null }); 
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
