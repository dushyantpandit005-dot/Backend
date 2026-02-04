const express=require("express");
const app=express();

app.get("/",(req,res)=>{
    res.send("this is my home page");
});
app.get("/about",(req,res)=>{
    res.send("this is my about page");
});
app.get("/contact",(req,res)=>{
    res.send("this is my contact page");
});
app.get("/help",(req,res)=>{
    res.send("this is my help page");
});
app.use((req,res)=>{
    res.status(404).send("this page is not found");
});
app.listen(3000,()=>{
    console.log(`server is running at address http://localhost:3000`);
})