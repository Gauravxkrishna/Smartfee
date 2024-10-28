const express = require('express');
const router = express.Router();

// Import controller functions
const { createInstitute } = require('../controllers/CreateInstitute');
const { updateInstitute } = require('../controllers/UpdateInstitute');
const { deleteInstitute } = require('../controllers/DeleteInstitute');

// Define the POST and DELETE routes
router.post('/createInstitute', createInstitute);
router.post('/updateInstitute/:id', updateInstitute);
router.delete('/deleteInstitute/:id', deleteInstitute); // New route for deleting institute

module.exports = router;
