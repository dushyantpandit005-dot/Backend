const express=require("express");
const app=express();

// app.get("/",(req,res)=>{
//     res.send("this is my home page");
// });
// app.get("/about",(req,res)=>{
//     res.send("this is my about page");
// });
// app.get("/contact",(req,res)=>{
//     res.send("this is my contact page");
// });
// app.get("/help",(req,res)=>{
//     res.send("this is my help page");
// });
// app.get("/dushyant",(req,res)=>{
//     res.send("this is my dushyant page");
// });
// app.use((req,res)=>{
//     res.status(404).send("this page is not found");
// });
// app.listen(3000,()=>{
//     console.log(`server is running at address http://localhost:3000`);
// })


app.get("/user/:id",(req,res)=>{
    const userId=req.params.id;
    res.send(`user id is ${userId}`);
});
app.get("/search",(req,res)=>{
    console.log(req.query);
    res.send(`my name is ${req.query.name} and my branch is ${req.query.branch}`);
})
app.listen(3000,()=>{
    console.log(`server is running at address http://localhost:3000/search?name=Dushyant&branch=CSE`);
});