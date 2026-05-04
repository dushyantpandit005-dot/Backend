const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();
app.use(cookieParser("mysecretkey"));
const options={
    maxAge:1000*60*2,
    httpOnly:true,
    signed:true
}
app.get("/setcookie",(req,res)=>{
    res.cookie("name","vijay",options);
    res.cookie("age",22,options);  
    res.cookie("city","mathura",options); 
    res.send("cookie set successfully");
});
app.get("/getcookie",(req,res)=>{
    res.send(req.signedCookies);
});
app.get("/deletecookie",(req,res)=>{
    res.clearCookie("name");
    res.send("cookie deleted successfully");
})
app.listen(3000);