/**
 * Controller for users related manipulations.
 *
 * Author: Haoming Yin
 * Date: 8/8/2017
 */

const users = require("../models/users.model");
/**
 * Create a new user
 */
exports.create = function (req, res) {
    let b = req.body;
    let invalid = false;
    if (typeof b.user !== 'undefined') {
        invalid = /^[a-zA-Z0-9_]{5, 30}$/.test(b.user.username);
        invalid = /^[a-zA-Z0-9 ]{5, 100}$/.test(b.user.location) || invalid;
        invalid = /\S+@\S+\.\S+/.test(b.user.email) || invalid;
        invalid = typeof b.password === 'undefined' || invalid;
    } else {
        invalid = true;
    }

    if (invalid) {
        res.status(400).send("Unable to create a user based on given information.");
    } else {
        users.addUser([b.user.username, b.password, b.user.location, b.user.email], function (err, result) {
            if (err) {
                res.status(400).send("Unable to create a user based on given information.\n" + err + result);
            } else {
                res.status(202).send("Ok");
            }
        });
    }

};

/**
 * Login an user into the system
 */
exports.login = function (req, res) {
    return null;
};

/**
 * Logout a current logged in user session
 */
exports.logout = function (req, res) {
    return null;
};

/**
 * Get user by user id
 */
exports.get = function (req, res) {
    // user id can only be integer
    if (/^[0-9]+$/.test(req.params.id)) {
        req.status(400).send("Invalid id supplied");
    } else {
        users.getUserById(req.params.id, function (err, rows) {
            if (err || rows.length > 0) {
                req.status(404).send("User not found");
            } else {
                req.json(rows[0]);
                req.status(200);
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