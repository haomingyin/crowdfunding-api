/**
 *  The enter point of this app
 */

const db = require('./config/db');
const express = require('./config/express');
const fs = require("fs");

const app = express();
const PORT = 4879;

// connect to MySQL on start
// setTimeout(function () {
//     db.connect(function (err) {
//         if (err) {
//             console.log("Unable to connect to MySQL.");
//         } else {
//             listen();
//         }
//     });
// }, 2000);


// set a time out to wait for mysql to be initialized
setTimeout(function () {
    db.connect(listen);
}, 2000);

let listen = function () {
    app.listen(PORT, function () {
        console.log('Listening on port: ' + PORT);
    });
};

app.get("/hi", function (req, res) {
    db.getPool().query("SELECT * FROM users;", function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
    // res.send("HELLO, SENG365_MYSQL_HOST: " + process.env.SENG365_MYSQL_HOST + " SENG365_MYSQL_PORT: " + process.env.SENG365_MYSQL_PORT + "\n");
});

app.get("/init", function (req, res) {
    db.initialize(function (err, result) {
        res.send("error msg: " + err + " result: " + result);
    });
});

app.get("/file", function (req, res) {
    fs.readFile(__dirname + "/config/init.sql", function (err, data) {
        res.send(err + data);
    });
});
