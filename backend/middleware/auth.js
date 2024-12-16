// auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth =(req, res, next)=>{
    try {
        //extract JWT token

        console.log("cookie,", req.cookies.token);
        console.log("body",  req.body.token);
        console.log("header", req.header("Authorization")); //safest way to fetch token

        const token =req.cookie.token || req.body.token || req.header("Authorization").replace("Beerer", "");

        if(!token){
            return res.status(401).json({
                success:true,
                message:"Token Missing."

            })
        }
        
        // verify the token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload)
            //why this ?
            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                success : false,
                message:'token is invalid',
            })
        }

        next();
    } catch (error) {
        
    }
};


exports.isStudent =(req,res,next)=>{
    try {
        if(req.user.role != "student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for student."
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role is not matching."
        })
    }
};

exports.isInstitute =(req,res,next)=>{
    try {
        if(req.user.role != "institute"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for institute."
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role is not matching."
        })
    }
};