const express=require("express")
const sroutes=express.Router()

const authentication=require("../Middleware/authentication")
const shoppingModel=require("../Models/shoppingModel")
const UserModel=require("../Models/userModel")


sroutes.post("/shop/:userId",authentication,async(req,res)=>{
    const userId=req.params.userId

    const {title,quantity,priority,date,description}=req.body

    const new_task=new shoppingModel({
        userId,title,quantity,priority,date,description
    })

   await new_task.save()
   res.send({message:"shoplist created",new_task})
    
})

sroutes.delete("/:userId/shop/:shopId",authentication,async(req,res)=>{
    const {shopId}=req.params
    const {userId}=req.params

    const task=await UserModel.findOne({userId})
    if(!task){
return res.send({message:"user not allowed"})
    }
    else{

    await shoppingModel.findByIdAndDelete({_id:shopId})
     return res.send({message:"data deleted"})
    }
})

sroutes.get("/:userId/shop", authentication,async(req,res)=>{
    const {userId}=req.params

        let task=await shoppingModel.find({userId})
        return res.send({"message" : "data",task})
      
})

module.exports=sroutes
