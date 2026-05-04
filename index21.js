const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/myDB10");
    console.log("DB connected successfully ✅");
  } catch (error) {
    console.log("error:",error)
  }
}
connectDB();
const StudentSchema=new mongoose.Schema({
    Name:String,
    Adar_no:{type:Number,required:true,unique:true},
    Mob_no:{type:Number,required:true,unique:true},
    Address:{type:String,required:true},
    Email:{type:String,required:true,unique:true},
    Password:{type:String,required:true}
})
const User=mongoose.model("User",StudentSchema);
app.post("/signup", async (req, res) => {
  const { Name, Adar_no, Mob_no, Address, Email, Password } = req.body;
  const exist = await User.findOne({Email});
  if (exist) {
    return res.send("user already exist");
  }
  const hashedPassword = await bcrypt.hash(Password,10);
  const user = new User({Name,Adar_no,Mob_no,Address,Email,Password: hashedPassword});
  await user.save();
  res.send("signUp successful ✅");
});app.post("/login",async(req,res)=>{
    const {Email,Password}=req.body;
    const user=await User.findOne({Email});
    if(!user){
        return res.send("no user Found ❌");
    }
    const exist=await bcrypt.compare(Password,user.Password);
    if(!exist){
        return res.send("please enter correct password");
    }
    const token=jwt.sign({id:user._id},"mySecretKey",{expiresIn:"1h"});
    res.json({
        message:"Login successful ✅",
        token
    })
})
function authMiddleware(req,res,next){
    const token=req.headers.authorization;
    if(!token){
        return res.send("no token provided ❌");
    }
    const decoded=jwt.verify(token,"mySecretKey");
    req.userId=decoded.id;
    next();

}
app.get("/profile",authMiddleware,async(req,res)=>{
    const user=await User.findById(req.userId);
    res.json(user);
})
app.listen(3000);