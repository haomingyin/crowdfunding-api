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

// first time connect to database, wait 3 seconds for MySQL VM to set up
let initialize = function () {
    // first connect to database
    db.connect(function () {
        // then initialize db schema
        db.initialize(function (err) {
            // if fail to initialize db, wait for 2 second then redo it.
            if (err) {
                setTimeout(initialize, 500);
            } else {
                listen();
            }
        });
    });
};

// if run locally, then only connect to database.
if (process.env.SENG365_DOCKER_FLAG) {
    initialize();
} else {
    db.connect(function () {
    });
    db.initialize(listen);
}
