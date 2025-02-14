const express = require('express');
const connectDB = require('./configuration/config');
require('dotenv').config();
console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging ke liye


const app = express();
app.use(express.json()); 

// Connect Database
connectDB();

app.get('/', (req, res) => {
  res.send('Job Portal API Running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
