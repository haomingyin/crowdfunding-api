/*
    The enter point of this app
 */

// const db = require('./config/db');
const express = require('./config/express');

const app = express();
const PORT = process.env.SENG365_PORT;
// const PORT = 4941;

// connect to MySQL on start
// db.connect(function (err) {
//     if (err) {
//         console.log("Unable to connect to MySQL.");
//     } else {
//         app.listen(PORT, function () {
//             console.log('Listening on port: ' + PORT);
//         })
//     }
// });

app.get("/hi", function (req, res) {
    res.send("Hello world");
    res.end("That's it!");
});

app.listen(PORT, function () {
    console.log('Listening on port: ' + PORT);
});