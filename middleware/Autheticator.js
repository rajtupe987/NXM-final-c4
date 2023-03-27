const jwt=require("jsonwebtoken");
require("dotenv").config();

const Authenticator=(req,res,next)=>{

    const token=req.headers.authorization;

    if(token){
 
        jwt.verify(token,process.env.s_key,(err,decoded)=>{
            if(decoded){
                req.body.userId=decoded.userId

                next();
            }else{
                res.status(400).send({"msg":"you are not athorize please login"})
            }

        })
    }else{
        res.status(400).send({"msg":"you are not athorize please login"})
    }
}

module.exports={
    Authenticator
}