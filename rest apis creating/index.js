const express = require('express');
const app = express()
// const users = require('./MOCK_DATA.json')
PORT = 5000;
const fs = require('fs')
const mongoose = require('mongoose');
const { type } = require('os');
const { timeStamp } = require('console');

// mongodb connection

mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=> console.log("mongoDB connected"))
.catch((err)=> console.log("mongo error", err));

// schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender:{
        type: String,
    },
    
}, {timestamps: true})

// model

const User = mongoose.model("user", userSchema)
// Middleware

app.use(express.urlencoded({extended: false}));

app.use((req, res, next)=>{
    console.log("Hello from mSiddleware 1");
    next();
})


// ye middleware log data save kregi ak file bna kr us me
app.use((req, res, next)=>{
    fs.appendFile("log.txt", `\n${Date.now()}: ${req.method}: ${req.path}`, (err, data)=>{
    next();})
})

// api to get all users
app.get('/api/users', async (req, res)=>{
    const allDbUsers = await User.find({});
    const html = `
        <ul>
            ${allDbUsers.map((user)=> `<li>${user.firstName} - ${user.email}</li>`).join("")}
        </ul>`;
        res.send(html);
})


// api to get user with specific id
app.get('/api/users/:id', async (req, res)=>{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ error: "User not found"})
    return res.json(user);
})

app.patch('/api/users/:id', async (req, res)=>{
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"})
    return res.json({status: "success"})
})
app.delete('/api/users/:id', async (req, res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "success"})
})

app.post('/api/users', async (req, res)=>{
    const body = req.body

    if(
        !body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title
    ) {
        
        return res.status(400).json({msg: 'All fields are required'})
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })
    console.log("user created result", result);
    
    return res.status(201).json({msg: "Success"})

    
    
})

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`);
    
})