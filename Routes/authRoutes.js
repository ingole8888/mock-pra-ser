const express = require("express")
const bcrypt  = require("bcrypt")

const jwt = require('jsonwebtoken');

const UserModel =require("../Models/userModel")
const userController = express.Router();

userController.post("/signup", (req, res) => {
    const {email, password} = req.body;
    bcrypt.hash(password, 6, async function(err, hash) {
        if(err){
            res.send("please try again")
        }
        const user = new UserModel({
            email,
            password : hash
        })
        await user.save();
        res.send({message:"Sign up is successfull"})
    });
})

userController.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    console.log(user)
    if(!user){
        return res.send("Invalid Credentials")
    }
    const hash = user.password;
    
    bcrypt.compare(password, hash, function(err, result) {
       if(err){
        return res.send("please try again later")
    }

    if(result){
        const token=jwt.sign({email:user.email,_id:user._id},"shhhhh")
        
        return res.send({message:"login succesfully",token:token,userId:user._id})
    }
    else{
        res.send("invalid password")
    }
    });
})

module.exports = userController