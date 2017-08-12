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
    users.addUser([b.user.username, b.password, b.user.location, b.user.email], function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(400).send("Malformed user data\nError details: " + err);
        } else {
            res.status(202).send(`${result.insertId}`);
        }
    });
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
            res.set('Content-Type', 'application/json');
            res.status(200).send({"id": rows[0].id, "token": token});
        }
    });
};

/**
 * Logout a current logged in user session
 */
exports.logout = function (req, res) {
    jwt.invoke(req.get('X-Authorization'));
    res.status(200).send("OK");
};

/**
 * Get a user by user id
 */
exports.get = function (req, res) {
    // user id can only be integer
    if (!/^[0-9]+$/.test(req.params.id)) {
        res.status(400).send("Invalid id supplied\n");
    } else {
        users.getUserById(req.params.id, function (err, rows) {
            if (err || rows.length !== 1) {
                res.status(404).send("User not found\n");
            } else {
                res.set('Content-Type', 'application/json');
                res.status(200).send(rows[0]);
            }
        });
    }
};

/**
 * Update user's information
 */
exports.update = function (req, res) {
    let b = req.body;
    users.update([b.user.username, b.password, b.user.location, b.user.email, req.params.id], function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(400).send("Failed to update\nError details: " + err + "\n");
        } else if (result.affectedRows === 0) {
            res.status(404).send("User not found\n");
        } else {
            res.status(200).send("Updated user\n");
        }

    });
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {
    users.delete(req.params.id, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(403).send("The user has been associates with projects, pledges or rewards\nError details: " + err + "\n");
        } else if (result.affectedRows === 0) {
            res.status(404).send("User not found\n");
        } else {
            res.status(200).send("User deleted\n");
        }
    });
};

//TODO: should be removed!
/**
 * Get all users -- just for test
 */
exports.getAll = function (req, res) {
    res.set('Content-Type', 'application/json');
    users.getAllUsers(function (err, rows) {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
};