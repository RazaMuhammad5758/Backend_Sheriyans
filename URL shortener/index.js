const express = require('express');
const app = express();
const PORT = 8002;
const urlRoute = require('./routes/url');
const { connectToMongoDb } = require('./connectDB');
const URL = require('./models/url');

connectToMongoDb('mongodb://localhost:27017/short-url')
    .then(() => console.log("MongoDB connected"));

app.use(express.json());
app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },  // Find the document with this shortId
        { 
            $push: { 
                visitedHistory: { timestamp: Date.now() }  // ✅ Correct field name
            } 
        },
        { new: true }  // ✅ Return the updated documen
    );

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});
