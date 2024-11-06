const bcrypt = require("bcrypt");
const User = require("../../model/InstituteSchema") ;
const jwt = require("jsonwebtoken");
require("dotenv").config();

export default Login = async (req, res)=>{
    try {
        
        //data fetch
        const {email, password} = req.body;

        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill the required details",
            });
        }

        //check for registered user
        let user = await User.findOne({email});
        //if not a registered user
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered."
            })
        }

        const payload ={
            email:user.email,
            id:user._id,
            role:user.role
        }

        //verify password & generate a JWT token
        if(await bcrypt.compare(password,user.password)){
            //password match
            let token = jwt.sign(payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:'"2h',
                                });
            user = user.toObject();
            user.token=token;
            user.password=undefined;
            const option = {
                expires : new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token", token, option).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully."
            });


        }
        else{
            //password do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect."
            })
        }

         
    } catch (error) {
       console.log(error);
       return res.status(500).json({
        success:false,
        message:'Login Failure'
       })
    }
}