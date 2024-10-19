const mongoose = require('mongoose');

const InstituteSchema = new mongoose.Schema(
    {
        instituteName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
);

module.exports = mongoose.model("Institute", InstituteSchema);
