const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User");

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_12345";

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

// Register endpoint
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Create new user
        const user = new User({
            name,
            email: email.toLowerCase(),
            password,
            phone: phone || ""
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: user.toJSON(),
            userId: user._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during registration" });
    }
});

// Login endpoint
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: user.toJSON(),
            userId: user._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during login" });
    }
});

// Get user profile (protected)
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user.toJSON());
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Update user profile (protected)
router.put("/profile", verifyToken, async (req, res) => {
    try {
        const { name, phone, profileImage } = req.body;
        
        const user = await User.findByIdAndUpdate(
            req.userId,
            { name, phone, profileImage },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            message: "Profile updated successfully",
            user: user.toJSON()
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during profile update" });
    }
});

// Verify token endpoint
router.get("/verify", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json({ valid: true, user: user.toJSON() });
    } catch (err) {
        res.status(401).json({ valid: false, error: "Invalid token" });
    }
});

// Export middleware and router
router.verifyToken = verifyToken;

module.exports = router;
