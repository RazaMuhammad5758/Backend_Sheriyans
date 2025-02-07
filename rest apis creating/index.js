const express = require('express');
const app = express()
const users = require('./MOCK_DATA.json')
PORT = 5000;
const fs = require('fs')
const mongoose = require('mongoose');
const { type } = require('os');

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
    }
})

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
app.get('/api/users', (req, res)=>{
    return res.json(users)
})


// api to get user with specific id
app.get('/api/users/:id', (req, res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=> user.id === id);
    return res.json(user);
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