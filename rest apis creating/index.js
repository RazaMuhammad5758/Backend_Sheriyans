const express = require('express')
const app = express()

PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`);
    
})