const express=require("express");
const  {userModel}=require("../modle/user")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();


const userrouter=express.Router();

userrouter.post("/register",async(req,res)=>{
 

    try {
         const pageloding=req.body;
         const user=await userModel.findOne({email:pageloding.email});
         if(user){
            res.send({"msg":"User already exist, please login"})
         }else{
            const passhash=await bcrypt.hashSync(pageloding.password,5);
            pageloding.password=passhash;

            const newuser=new userModel(pageloding);
           await newuser.save();

           return res.send({"msg":"User Registered Succesfully..",user:newuser})
         }
    } catch (error) {
        res.send({"msg":error.message})
    }
});


userrouter.post("/login",async(req,res)=>{
    
    try {
        const pageloding=req.body;
        const user=await userModel.findOne({email:pageloding.email});

        if(!user){
            return res.send({"msg":"Please Signup .."})
        }

        const passcheck=await bcrypt.compare(
            pageloding.password,
            user.password
        )

        if(passcheck){
            let token=await jwt.sign({email:user.email,userId:user._id},process.env.s_key);
            res.send({"msg":"Login succesfull",token})
        }else{
            res.send({"msg":"Invalid details found"})
        }
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports={
    userrouter
}

