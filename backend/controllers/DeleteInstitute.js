const Institute = require("../model/InstituteSchema");

exports.deleteInstitute = async (req, res) => {
    try {
        // Extract ID from the request params
        const { id } = req.params;

        // Find the institute by ID and remove it
        const deletedInstitute = await Institute.findByIdAndDelete(id);

        // If the Institute item is not found
        if (!deletedInstitute) {
            return res.status(404).json({
                success: false,
                message: 'Institute not found.',
            });
        }

        // Return success response with a message
        res.status(200).json({
            success: true,
            message: 'Institute deleted successfully.',
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
