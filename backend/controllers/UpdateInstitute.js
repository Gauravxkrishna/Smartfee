const Institute = require("../model/InstituteSchema");

exports.updateInstitute = async (req, res) => {
    try {
        // Extract id from the request params and instituteName, password from the request body
        const { id } = req.params;
        const { instituteName, password } = req.body;

        // Check if both fields are missing
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Institute name or password is required to update.",
            });
        }

        // Create an object with the fields to update, only if they are provided
        const updateFields = {};
        if (instituteName) updateFields.instituteName = instituteName;
        if (password) updateFields.password = password;

        // Update the Institute item by ID
        const updatedData = await Institute.findByIdAndUpdate(
            id, // ID from request params
            updateFields, // Fields to update
            { new: true, runValidators: true } // Return the updated document and ensure validation
        );

        // If the Institute item is not found
        if (!updatedData) {
            return res.status(404).json({
                success: false,
                message: 'Institute not found.',
            });
        }

        // Return success response with the updated data
        res.status(200).json({
            success: true,
            data: updatedData,
            message: 'Institute updated successfully.',
        });

    } catch (error) {
        // Handle errors and send a 500 response
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
