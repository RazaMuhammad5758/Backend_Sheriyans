const express = require('express')
const app = express()
const PORT = 8002
const urlRoute = require('./routes/url')
const {connectToMongoDb} = require('./connectDB')


connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=> console.log("mongodb conntected")
)

app.use(express.json())

app.use('/url', urlRoute)

app.listen(PORT, ()=>{ console.log(`Server started at PORT: ${PORT}`);
})