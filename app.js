/**
 *  The enter point of this app
 */

const db = require('./config/db');
const express = require('./config/express');

const app = express();
let PORT = 4879;

if (process.env.SENG365_DOCKER_FLAG) PORT = 4941;

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

// first time connect to database, wait 3 seconds for MySQL VM to set up
let initialize = function () {
    // first connect to database
    db.connect(function () {
        // then initialize db schema
        db.initialize(function (err) {
            // if fail to initialize db, wait for 2 second then redo it.
            if (err) {
                setTimeout(initialize, 10000);
            } else {
                if (Number(process.env.SENG365_DOCKER_FLAG) === 0) {
                    throw "Docker Flag is set to 0, terminate this instance so that it can run locally";
                }
                listen();
            }
        });
    });
};

// if run on docker, then initialize database.
if (process.env.SENG365_DOCKER_FLAG) {
    initialize();
} else {
    db.connect(function () {
    });
    listen();
}
