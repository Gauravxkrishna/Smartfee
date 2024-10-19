const express = require('express');
const router = express.Router();

// Import controller function
const { createInstitute } = require('../controllers/CreateInstitute');

// Define the POST route
router.post('/createInstitute', createInstitute);

module.exports = router;
