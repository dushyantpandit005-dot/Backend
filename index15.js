const express = require("express");
const app = express();
app.use(express.json());
const users = [
  { id: 1, name: "Sujay", branch: "ECE", city: "Pune" },
  { id: 2, name: "Subhi", branch: "CSE", city: "Mumbai" },
  { id: 3, name: "Satyarth", branch: "IT", city: "Delhi" },
];
app.get("/users",(req,res)=>{
    const html=`
    <ul>
       ${users.map(user=>`<li>${user.name} has branch ${user.branch}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});
app.get("/names",(req,res)=>{
  const html=`
  <ul>
      ${users.map(user=>`<li>my name is ${user.name} and I am from ${user.city} and I am in ${user.branch} branch</li>`).join("")}
  </ul>
  `;
  res.send(html);
})
app.get("/api/users", (req, res) => {
  return res.json(users);
});
app.get("/api/users/:id",(req,res)=>{
  const id=req.params.id;
  const user=users.find(user=>user.id==id);
  if(!user){
    return res.status(404).json({message:"User not found"});
  }
  else{
    return res.json(user);
  }

});
app.post("/api/users",(req,res)=>{

  const newUser={
    id:users.length+1,
    ...req.body
  }
  users.push(newUser);
  return res.json(users);
});
app.patch("/api/users/:id",(req,res)=>{
  const id = req.params.id;
  const user = users.find(user=>user.id == id);
  if(!user){
    return res.status(404).json({message:"users not found"});

  }
  else{
    Object.assign(user,req.body);
    return res.json(users);
  }
  })
app.delete("/api/users/:id",(req,res)=>{
  const id = req.params.id;
  const userindex=users.findIndex(user=>user.id==id);
  if(userindex==-1){
    return res.status(404).json({message:"users not found"});
  }
  else{
    users.splice(userindex,1);
    return res.json(users);
  }
  })
app.listen(3000);