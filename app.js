/**
 *  The enter point of this app
 */

const db = require('./config/db');
const express = require('./config/express');

const app = express();
const PORT = 4941;

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

db.initialize(function (err) {
    if (err) {
        console.log("Unable to initialize MySQL.");
    } else {
        app.listen(PORT, function () {
            console.log('Listening on port: ' + PORT);
        })
    }
});

app.get("/hi", function (req, res) {
    db.getPool().query("SELECT COUNT(*) AS all FROM USERS;", function (err, result) {
        if (err) {
            res.send("Cannot connect to mysql.");
        } else {
            res.send("mysql has " + result.all + "items in USERS table. ");
        }
    })
    // res.send("HELLO, SENG365_MYSQL_HOST: " + process.env.SENG365_MYSQL_HOST + " SENG365_MYSQL_PORT: " + process.env.SENG365_MYSQL_PORT + "\n");
});

