const express = require('express');
const { restrictToUserLoggedIn } = require('../middlewares/auth');
const { handleGenerateNewShortURL, handleGetAnalytics, handleDeleteURL } = require('../controllers/url');

const router = express.Router();

router.post('/', restrictToUserLoggedIn, handleGenerateNewShortURL);
router.get('/analytics/:shortId', restrictToUserLoggedIn, handleGetAnalytics);
router.get('/delete/:shortId', restrictToUserLoggedIn, handleDeleteURL);

module.exports = router;
