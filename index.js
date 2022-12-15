const express=require("express")
// const cors = require('cors')

const connection= require("./Config/config")
const userController =require("./Routes/authRoutes")
const sroutes =require("./Routes/shoppingRoutes")
const broutes =require("./Routes/bookmarkRoutes")

require('dotenv').config()

const app=express()
app.use(express.json())
// app.use(cors())

app.use("/user", userController)
app.use("/", sroutes)
app.use("/bookmark", broutes)


app.get("/",(req,res)=>{
    res.send("home")
})



app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("db connected");
    }
    catch(err){
        console.log(err);
    }
    console.log(`db connect at ${process.env.PORT}`);
})