const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to authenticate users
exports.auth = (req, res, next) => {
  try {
    // Extract JWT token from cookies, body, or headers
    console.log("Cookie:", req.cookies.token);
    console.log("Body:", req.body.token);
    console.log("Header:", req.header("Authorization")); // Safest way to fetch token

    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing.",
      });
    }

    // Verify the token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload; // Attach the payload to the request object
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

// Middleware to check if the user is a student
exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.status(401 ).json({
        success: false,
        message: "Access denied. This route is for students only.",
      });
    }
    next();
  } catch (error) {
    console.error("Error in isStudent middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Role verification failed.",
    });
  }
};

// Middleware to check if the user is an institute
exports.isInstitute = (req, res, next) => {
  try {
    if (req.user.role !== "institute") {
      return res.status(403).json({
        success: false,
        message: "Access denied. This route is for institutes only.",
      });
    }
    next();
  } catch (error) {
    console.error("Error in isInstitute middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Role verification failed.",
    });
  }
};
