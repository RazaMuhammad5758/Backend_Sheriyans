const mongoose = require('mongoose')

async function connecMongoDb(url) {
   return mongoose.connect(url)
    .then(()=> console.log("mongoDB connected"))
    .catch((err)=> console.log("mongo error", err));
    
}
module.exports = {
    connecMongoDb,
}