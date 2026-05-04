const express=require("express");
const fs=require("fs");
const app=express();
const users=require("./MOCK_DATA.json");
app.use(express.json());
app.get("/api/users",(req,res)=>{
    return res.json(users);
})
app.get("/api/users/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const user = users.find(user => user.id === id);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    return res.json(user);
});
app.post("/api/users",(req,res)=>{
    const newUser={
        id:users.length+1,
        ...req.body
    };
    users.push(newUser);
    fs.writeFile("MOCK_DATA.json",JSON.stringify(users),(err)=>{
        if(err){
            return res.status(500).json({message:"Error saving user"});
        }
        return res.status(201).json(newUser);
    });
});
app.patch("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const body = req.body;
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users[userIndex] = { ...users[userIndex], ...body };
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) return res.status(500).json({ message: "Error saving data" });
    return res.json({ status: "User updated" });
  });
});
app.delete("/api/users/:id",(req,res)=>{
    const id=req.params.id;
    const userIndex=users.findIndex(user=>user.id==id);
    if(userIndex==-1){
        return res.status(404).json({message:"users not found"});
    }
    users.splice(userIndex,1);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
        if(err){
            res.status(500).json({message:"users can not be deleted"})
        }
        else{
            return res.json({message:"users has been deleted successfully"})
        }
    })
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});