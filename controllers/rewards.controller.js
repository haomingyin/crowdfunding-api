/**
 * Controller for rewards related manipulations.
 *
 * Author: Haoming Yin
 * Date: 8/8/2017
 */

const rewards = require("../models/rewards.model");

/**
 * View project rewards
 */
exports.get = function (req, res) {
    res.set('Content-Type', 'application/json');
    rewards.getByProjectID(req.params.id, function (err, rows) {
        if (err) {
            res.status(500).send("Failed to fetch rewards\nError details: " + err);
        } else {
            res.status(200).send(rows);
        }
    });
};

/**
 * Update project rewards
 */
exports.update = function (req, res) {
    rewards.updateByProjectID(req.params.id, req.body, function (err) {
        if (err) {
            res.status(400).send("Malformed request\nError details: " + err);
        } else {
            res.status(201).send("OK");
        }
    });
};

