const bcrypt = require("bcrypt");
const User = require("../../model/InstituteSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill the required details",
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format.",
            });
        }

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered.",
            });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(403).json({
                success: false,
                message: "Password is incorrect.",
            });
        }

        // Generate JWT token
        const payload = { email: user.email, id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

        // Attach token and sanitize user object
        user = user.toObject();
        user.token = token;
        user.password = undefined;

        // Set cookie options
        const cookieOptions = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure in production
        };

        // Send response
        return res.cookie("token", token, cookieOptions).status(200).json({
            success: true,
            message: "User logged in successfully.",
            data: { token, user },
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Login Failure",
        });
    }
};

module.exports = { loginHandler };
