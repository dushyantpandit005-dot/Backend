const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
async function connectDB(){
    try{
     await mongoose.connect("mongodb://localhost:27017/myDatabase");
     console.log("DB connected  successfully ");
    }
    catch(error){
        console.log("conenction error:",error);
        process.exit(1);
    }
}
connectDB()
const userSchema=new mongoose.Schema({
    name:String,
    age:Number,
    email:String
});
const User=mongoose.model("User",userSchema);
app.post("/users",async(req,res)=>{
    const user=await User.create(req.body);
    res.json(user);

    
})
app.get("/users",async(req,res)=>{
    const users=await User.find();
    res.json(users);
})
app.get("/users/:id",async(req,res)=>{
    let user;
    try{
        user=await User.findById(req.params.id);
        if(!user) return res.status(404).json({error:"User not found"});
    }
    catch(err){
        return res.status(404).json({error:"Invalid user id"});
    }
    res.json(user);
})
app.put("/users/:id",async(req,res)=>{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(user);
})
app.delete("/users/:id",async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.json({message:"User deleted successfully"});
})
app.get("/filters",async(req,res)=>{
    const user = await User.find({age:{$gt:20}});
    res.json(user);
})
app.listen(3000);