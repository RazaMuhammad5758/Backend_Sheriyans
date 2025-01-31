const express = require('express')
const app = express()
const users = require('./MOCK_DATA.json')
PORT = 8000;

app.get('/users', (req, res)=>{
    return res.json(users)
})

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`);
    
})