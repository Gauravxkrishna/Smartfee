const express = require('express');
const router = express.Router();

// Import controller functions
const { createInstitute } = require('../controllers/CreateInstitute');
const { updateInstitute } = require('../controllers/UpdateInstitute');
const { deleteInstitute } = require('../controllers/DeleteInstitute');
const { loginHandler } = require('../controllers/Auth/instituteLogin'); // Import your login controller
const {auth, isStudent, isInstitute} = require("../middleware/auth")

// Define the POST and DELETE routes
router.post('/createInstitute', createInstitute);
router.post('/updateInstitute/:id', updateInstitute);
router.delete('/deleteInstitute/:id', deleteInstitute);

// Add the login route
router.post('/instituteLogin', loginHandler); // Login route for user authentication

//test route for single middleware
router.get("/test", auth, (req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome in test route."
    })
})

//protected route for student
router.get("/student", auth,isStudent, (req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome in student route."
    })
})
router.get("/institute", auth,isInstitute, (req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome in institute route."
    })
})




module.exports = router;
