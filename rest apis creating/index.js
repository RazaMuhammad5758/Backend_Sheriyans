const express = require('express');
const app = express()
PORT = 5000;
const userRoutes = require("./routes/user");
const {connecMongoDb} = require('./connection')
const {logReqRes} = require('./middlewares')

// mongodb connection

connecMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")

// Middleware

app.use(express.urlencoded({extended: false}));

app.use((req, res, next)=>{
    console.log("Hello from middleware 1");
    next();
})


// ye middleware log data save kregi ak file bna kr us me
app.use(logReqRes('log.txt'))

// Routes

app.use('/api/users', userRoutes)

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`);
    
})