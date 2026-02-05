const express = require("express");
const path = require("path");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index3.html"));
});
app.post("/submit", (req, res) => {
    console.log(req.body);
    res.send(`User has name ${req.body.name} and email ${req.body.email} and number ${req.body.Mobile}`);
});
app.listen(3000, () => {
    console.log("server is running at http://localhost:3000");
});