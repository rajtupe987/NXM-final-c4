const mongoose = require("mongoose");


const lshcema = mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    password: String,
    age: Number,
    city: String,
    is_married: Boolean
})


const userModel=mongoose.model("user",lshcema);



module.exports={
    userModel
}