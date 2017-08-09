/**
 *  The enter point of this app
 */

const db = require('./config/db');
const express = require('./config/express');

const app = express();
const PORT = 4879;

// function that set the app to listen to a specific port
let listen = function () {
    app.listen(PORT, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Listening on port: ' + PORT);
        }
    });
};

// first time connect to database
db.connect(listen);

app.get("/hi", function (req, res) {
    db.getPool().query("SELECT * FROM users;", function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
});

app.get("/init", function (req, res) {
    db.initialize(function (err, result) {
        res.send("error msg: " + err + " result: " + result);
    });
});

