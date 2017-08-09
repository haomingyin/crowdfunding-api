/**
 *  The enter point of this app
 */

const db = require('./config/db');
const express = require('./config/express');

const app = express();
const PORT = 4941;

// connect to MySQL on start
// setTimeout(function () {
//     db.connect(function (err) {
//         if (err) {
//             console.log("Unable to connect to MySQL.");
//         } else {
//             app.listen(PORT, function () {
//                 console.log('Listening on port: ' + PORT);
//             })
//         }
//     });
// }, 5000);

// set a time out to wait for mysql to be initialized
setTimeout(function () {
    db.initialize(function (err) {
        if (err) {
            console.log("Unable to initialize MySQL.");
        } else {
            app.listen(PORT, function () {
                console.log('Listening on port: ' + PORT);
            });
        }
    });
}, 5000);

app.get("/hi", function (req, res) {
    db.getPool().query("SELECT COUNT(*) FROM users;", function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
    // res.send("HELLO, SENG365_MYSQL_HOST: " + process.env.SENG365_MYSQL_HOST + " SENG365_MYSQL_PORT: " + process.env.SENG365_MYSQL_PORT + "\n");
});

