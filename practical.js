const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/myDatabase");
        console.log("DB connected successfully");
    } catch (error) {
        console.log("Connection error:", error);
        process.exit(1);
    }
}
connectDB();
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: { type: String, required: true, unique: true },
    password: { type: String }
});
const User = mongoose.model("User", userSchema);
app.post("/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.delete("/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).send("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,email,age,password: hashedPassword
        });
        await user.save();
        res.send("Signup successful");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("No user found ❌");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Incorrect password");
        }
        const token = jwt.sign(
            { id: user._id },
            "mySecretKey",
            { expiresIn: "1h" }
        );
        res.json({
            message: "Login successful",
            token
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});