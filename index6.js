const express=require("express");
const path=require("path");
const app=express();
// app.set("view engine","ejs");
// app.get("/",(req,res)=>{
//     res.sendFile(path.join(__dirname,"index19.html"))
// });
app.set("views",__dirname);
app.get("/", (req, res) => {
  res.render("index",{name:"vaibhav"});
});

app.listen(3000,()=>{
    console.log(`server is running at address http://localhost:3000`);
});