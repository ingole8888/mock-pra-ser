const express=require("express")
const broutes=express.Router()

const authentication=require("../Middleware/authentication")
const bookmarkModel=require("../Models/bookmarkModel")

broutes.post("/:userId",authentication,async(req,res)=>{
    const userId=req.params.userId

    const {title,quantity,priority,date,description}=req.body

    const new_task=new bookmarkModel({
        userId,title,quantity,priority,date,description
    })

   await new_task.save()
   res.send({message:"bookmark created",new_task})
    
})

broutes.get("/:userId/book", authentication,async(req,res)=>{
    const {userId}=req.params

        let task=await bookmarkModel.find({userId})
        return res.send({"message" : "data",task})
      
})

module.exports=broutes


