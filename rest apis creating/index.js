const express = require('express')
const app = express()
const users = require('./MOCK_DATA.json')
PORT = 5000;
const fs = require('fs')
const mongoose = require('mongoose');
const { type } = require('os');


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
        type: string,
        required: true,
        unique: true,
    },
    jobTitle:{
        type: string,
    },
    gender:{
        type: string,
    }
})


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

app.post('/api/users', (req, res)=>{
    const body = req.body
    users.push({...body, id: users.length+1})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
        return res.status(201).json({status: 'success', id: users.length})

    })
    
})

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`);
    
})