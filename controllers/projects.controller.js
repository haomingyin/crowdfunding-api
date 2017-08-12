/**
 * Controller for projects related manipulations.
 *
 * Author: Haoming Yin
 * Date: 8/8/2017
 */

const projects = require("../models/projects.model");

/**
 * View all current projects
 */
exports.listAll = function (req, res) {
    projects.getAll(req.get("startIndex"), req.get("count"), function (err, rows) {
        if (err) {
            res.status(500).send("Failed to fetch projects\nError details: " + err);
        } else {
            res.status(200).send(JSON.stringify(rows));
        }
    })

};

/**
 * Create a new project
 */
exports.create = function (req, res) {
    projects.create(req.body, function (err, rows) {
        if (err || rows.length === 0) {
            res.status(400).send("Malformed project data\nError details: " + err);
        } else {
            res.status(201).send(JSON.stringify(rows) + err);
        }
    });
};

/**
 * View project details
 */
exports.get = function (req, res) {
    return null;
};

/**
 * Update project (open/close)
 */
exports.update = function (req, res) {
    return null;
};

/**
 * View project images
 */
exports.getImage = function (req, res) {
    return null;
};

/**
 * Update project image
 */
exports.updateImage = function (req, res) {
    return null;
};

/**
 * Pledge an amount to a project
 */
exports.pledge = function (req, res) {
    return null;
};