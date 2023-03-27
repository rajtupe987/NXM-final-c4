const mongoose = require("mongoose");


const pshcema = mongoose.Schema({
    title: {type:String,required:true},
    body: {type:String,required:true},
    device :{type:String,required:true,enum:["Laptop", "Tablet", "Mobile"]},
    no_of_comments: {type:Number,required:true},
    userId:{type:String,required:true}
})


const pmodel=mongoose.model("post",pshcema);



module.exports={
    pmodel
}