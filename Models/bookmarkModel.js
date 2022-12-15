const mongoose=require("mongoose")

const bookmarkschema=new mongoose.Schema({
    userId:{type:String,required:true},
    title:{type:String,required:true},
    quantity:{type:Number,required:true},
    priority:{type:String,required:true},
    date:{type:String,required:true},
    description:{type:String,required:true}
})

const bookmarkModel=mongoose.model("bookmark",bookmarkschema)

module.exports=bookmarkModel