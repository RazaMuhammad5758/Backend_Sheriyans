const express = require('express');
const app = express();
const PORT = 8002;
const urlRoute = require('./routes/url');
const { connectToMongoDb } = require('./connectDB');
const URL = require('./models/url');
const path = require('path')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')
const cookieParser = require('cookie-parser')
const {restrictToUserLoggedIn} = require('./middlewares/auth')

connectToMongoDb('mongodb://localhost:27017/short-url')
    .then(() => console.log("MongoDB connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: false})) // middleware for form data
app.use(cookieParser());
app.use('/url', restrictToUserLoggedIn, urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute)

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


app.get('/', (req, res) => {
    res.redirect('/url'); // ✅ Homepage `/url` pe le jaye
});



app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    console.log("Requested shortId:", shortId);

    const entry = await URL.findOneAndUpdate(
        { shortId },  
        { 
            $push: { visitedHistory: { timestamp: Date.now() } }
        },
        { new: true }  
    );

    console.log("Database entry found:", entry);

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    // ✅ Ensure the URL starts with http:// or https://
    let finalUrl = entry.redirectUrl;
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
        finalUrl = "http://" + finalUrl;  // Default to HTTP if missing
    }

    res.redirect(finalUrl);
});


app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});
