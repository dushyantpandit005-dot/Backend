const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
async function connectDB(){
    try{
     await mongoose.connect("mongodb://localhost:27017/myDB19");
     console.log("DB connected successfully ✅")
    }
    catch(error){
        console.log("error:",error);
        process.exit(1);
    }
}
connectDB();
const noteSchema = new mongoose.Schema({
    title:String,
    content:String,
    tags:[String],
    likes:{type:Number,default:0}
});
const Note = mongoose.model("Note",noteSchema);
app.post("/notes",async(req,res)=>{
    try{
        const note = await Note.create(req.body);
        res.json(note);
    }
    catch(error){
        res.status(500).json({error:"internal server error"});
    }
})
app.get("/notes",async(req,res)=>{
        const note = await Note.find();
        res.json(note);
})
app.get("/notes/search",async(req,res)=>{
  const {q}=req.query;
  const notes=await Note.find({
    $or:[
      {title:{$regex:q,$options:"i"}},
      {content:{$regex:q,$options:"i"}},
      {tags:{$regex:q,$options:"i"}}
    ]
  })
  res.json(notes);
});
app.post("/notes/:id/like",async(req,res)=>{
    const note = await Note.findByIdAndUpdate(req.params.id,{$inc:{likes:1}},{new:true});
    res.json(note);
});
app.get("/notes/:id",async(req,res)=>{
    const note = await Note.findByIdAndDelete(req.params.id);
    res.json({"message":"notes delete successfully"});
});
app.listen(3000);