const express=require("express");
const {connection}=require("./config/db");
const {userrouter}=require("./Routes/user.route");
const {postrouter}=require("./Routes/post.route")
const {Authenticator}=require("./middleware/Autheticator")
require("dotenv").config();
const cors=require("cors")


const app=express();
app.use(express.json());
app.use(cors())


app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/user",userrouter);
app.use(Authenticator)
app.use("/posts",postrouter)

app.listen(process.env.port,async()=>{
    
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error while connecting");
        console.log(error)
    }
    console.log(`port is runnit at ${process.env.port}`)
})