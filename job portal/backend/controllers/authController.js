const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Ensure bcrypt is imported


const plainTextPassword = "abc";
const saltRounds = 10;

bcrypt.hash(plainTextPassword, saltRounds, function(err, hash) {
    if (err) {
        console.error("Hashing error:", err);
    } else {
        console.log("Generated Hash:", hash);
    }
});


const registerUser = async (req, res) => {
  try {
      const { name, email, password, role } = req.body;

      // ✅ Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: "User already exists" });

      // ✅ Create user with plain password (hashing model mein ho rahi hai)
      const newUser = new User({ name, email, password, role });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;

      // ✅ Find User
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      console.log("User found:", user); // Debugging ke liye

      // ✅ Compare Entered Password with Hashed Password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMatch); // Debugging ke liye

      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      // ✅ Generate Token (Check if JWT_SECRET is missing)
      if (!process.env.JWT_SECRET) {
          console.error("JWT_SECRET is missing!");
          return res.status(500).json({ message: "Server Configuration Error" });
      }

      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.json({ message: "Login successful", token, user });
  } catch (error) {
      console.error("Login Error:", error); // ✅ Print Full Error
      res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const userId = req.user.id; // Middleware se aayega

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect old password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Password hide karega
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser, getProfile, updateProfile, changePassword };



