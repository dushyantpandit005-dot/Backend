const express=require("express");
const app=express();
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
   res.send("Hello world !!!");
});
app.post("/submit",(req,res)=>{
    console.log(req.body);
    res.send(`user has name ${req.body.name} and email ${req.body.email} and marks ${req.body.marks}`);
})
app.listen(3000,()=>{
    console.log(`server is running at address http://localhost:3000`);
});