const bcrypt = require("bcrypt");
const User = require("../../model/InstituteSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginHandler = async (req, res) => {
    try {
        // Extract data from request body
        const { email, password } = req.body;

        // Validate email and password fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill the required details",
            });
        }

        // Check if the user is registered
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered."
            });
        }

        // Prepare payload for JWT
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        };

        // Verify password and generate JWT token if correct
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '2h' } // Corrected expiration format
            );

            user = user.toObject(); // Convert to plain object
            user.token = token;
            user.password = undefined; // Hide password from response

            // Set cookie options
            const cookieOptions = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
                httpOnly: true,
            };

            // Send response with token and user info
            res.cookie("token", token, cookieOptions).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully."
            });

            res.status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully."
            });
        } else {
            // Password does not match
            return res.status(403).json({
                success: false,
                message: "Password is incorrect."
            });
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: 'Login Failure'
        });
    }
};

module.exports = { loginHandler };
