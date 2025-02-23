const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Ensure bcrypt is imported

const registerUser = async (req, res) => {
  try {
    console.log("Register Request Body:", req.body); // Debugging line

    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log("User already exists:", email); // Debugging line
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, role });
    console.log("User Registered Successfully:", user); // Debugging line

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error); // Debugging line
    res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log("Login Request Body:", req.body); // Debugging line

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found:", email); // Debugging line
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("User Found:", user); // Debugging line

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match for user:", email); // Debugging line
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("JWT Token Generated:", token); // Debugging line

    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error); // Debugging line
    res.status(500).json({ message: "Server Error" });
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



