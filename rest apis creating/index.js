const express = require('express')
const app = express()
const users = require('./MOCK_DATA.json')
PORT = 8000;
const fs = require('fs')


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
    users.push({...body, id: users.length+1})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
        return res.json({status: 'success', id: users.length})

    })
    
})

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`);
    
})