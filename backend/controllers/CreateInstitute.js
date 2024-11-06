// Import your model (assuming you have the Institute model defined)
const Institute = require('../model/InstituteSchema');
const bcrpt = require("bcrypt")

// Controller function to create a new institute
exports.createInstitute = async (req, res) => {
    try {
        // Extract data from the request body
        const { instituteName, password } = req.body;

        // Check if instituteName or password is missing
        if (!instituteName || !password) {
            return res.status(400).json({
                success: false,
                message: "Institute name and password are required.",
            });
        }

        // Check if the institute already exists in the database
        const existingInstitute = await Institute.findOne({ instituteName });
        if (existingInstitute) {
            return res.status(400).json({
                success: false,
                message: "Institute already exists.",
            });
        }

        // Create a new institute entry in the database
        const newInstitute = new Institute({
            instituteName,
            password
        });

        // Save the institute to the database
        const savedInstitute = await newInstitute.save();

        // Send a success response with the saved data
        res.status(201).json({
            success: true,
            data: savedInstitute,
            message: 'Institute created successfully.'
        });

        //Hashing the password
        let hashedpassword;
        try{
            hashedpassword = await bcrpt.hash(password, 10)
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in Hashing password."
            })
        }

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
