const express = require('express')
const app = express()
const users = require('./MOCK_DATA.json')
PORT = 8000;


// Middleware

app.use(express.urlencoded({extended: false}));

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
    console.log('body', body);
    return res.json({status: 'pending'})
    
})

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`);
    
})