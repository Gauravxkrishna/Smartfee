const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("MongoDB connected successfully.");
    })
    .catch((error) => {
        console.log("Error in MongoDB connection.");
        console.error(error);
        process.exit(1);
    });
};

module.exports = dbConnect;
