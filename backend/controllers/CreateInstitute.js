// Import your model (assuming you have the Institute model defined)
const Institute = require('../model/InstituteSchema');
const bcrypt = require("bcrypt");

// Controller function to create a new institute
exports.createInstitute = async (req, res) => {
    try {
        // Extract data from the request body
        const { instituteName, email, password } = req.body;

        // Check if instituteName, email, or password is missing
        if (!instituteName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Institute name, email, and password are required.",
            });
        }

        // Check if the institute already exists by name
        const existingInstituteByName = await Institute.findOne({ instituteName });
        if (existingInstituteByName) {
            return res.status(400).json({
                success: false,
                message: "Institute with this name already exists.",
            });
        }

        // Check if the email is already in use
        const existingInstituteByEmail = await Institute.findOne({ email });
        if (existingInstituteByEmail) {
            return res.status(400).json({
                success: false,
                message: "Institute with this email already exists.",
            });
        }

        // Hash the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password.",
            });
        }

        // Create a new institute entry in the database with hashed password, email, and role
        const newInstitute = new Institute({
            instituteName,
            email,
            password: hashedPassword,
            role: "institute"
        });

        // Save the institute to the database
        const savedInstitute = await newInstitute.save();

        // Send a success response with the saved data
        res.status(201).json({
            success: true,
            data: savedInstitute,
            message: 'Institute created successfully.'
        });

    } catch (error) {
        // Log the error to the console for debugging
        console.error(error);

        // Return a 500 Internal Server Error response
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
