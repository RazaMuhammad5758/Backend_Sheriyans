const fs = require("fs");

function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(filename, `\n${Date.now()}: ${req.method} ${req.path}`, (err) => {
            if (err) {
                console.error("Error writing log:", err);  // Log error properly
            }
            next(); // Ensure `next()` is always called
        });
    };
}

module.exports = { logReqRes };
