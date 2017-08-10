/**
 * Controller for users related manipulations.
 *
 * Author: Haoming Yin
 * Date: 8/8/2017
 */

const users = require("../models/users.model");
const jwt = require("../config/jsonwebtoken");
const db = require("../config/db");
/**
 * Create a new user
 */
exports.create = function (req, res) {
    let b = req.body;
    let valid = true;
    if (typeof b.user !== 'undefined') {
        valid = /^[a-zA-Z0-9_]{5,30}$/.test(b.user.username);
        valid = /^[a-zA-Z0-9 ]{5,100}$/.test(b.user.location) && valid;
        valid = /\S+@\S+\.\S+/.test(b.user.email) && valid;
        valid = typeof b.password !== 'undefined' && valid;
    } else {
        valid = false;
    }

    if (!valid) {
        res.status(400).send("Unable to create a user based on the given information\n");
    } else {
        users.addUser([b.user.username, b.password, b.user.location, b.user.email], function (err, result) {
            if (err) {
                res.status(400).send("Unable to create a user based on given information\n" + err + result);
            } else {
                res.status(202).send(`${result.insertId}`);
            }
        });
    }

};

/**
 * Login an user into the system
 */
exports.login = function (req, res) {
    users.login([req.body.username, req.body.password], function (err, rows) {
        if (err || rows.length !== 1) {
            res.status(400).send("Invalid username/password supplied\n")
        } else {
            let token = jwt.sign(rows[0]);
            res.status(200).send(JSON.stringify({"id": rows[0].id, "token": token}));
        }
    });
};

/**
 * Logout a current logged in user session
 */
exports.logout = function (req, res) {
    return null;
};

/**
 * Get a user by user id
 */
exports.get = function (req, res) {
    // user id can only be integer
    if (/^[0-9]+$/.test(req.params.id)) {
        req.status(400).send("Invalid id supplied\n");
    } else {
        users.getUserById(req.params.id, function (err, rows) {
            if (err || rows.length !== 1) {
                res.status(404).send("User not found\n");
            } else {
                res.status(200).send(JSON.stringify(rows[0]));
            }
        });
    }
};

/**
 * Update user's information
 */
exports.update = function (req, res) {
    return null;
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {
    return null;
};

//TODO: should be removed!
/**
 * Get all users -- just for test
 */
exports.getAll = function (req, res) {
    users.getAllUsers(function (err, rows) {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });

};