const express=require("express")
const jwt=require("jsonwebtoken")


const authentication = (req, res, next) => {
    if(!req.headers.authorization){
        return res.send("Please login again")
    }
    const user_token = req.headers.authorization.split(" ")[1]
    console.log('user_token:', user_token)
    jwt.verify(user_token, "shhhhh", function(err, decoded) {
        if(err){
            return res.send("Please login again")
        }
        next()
    });
}

module.exports=authentication