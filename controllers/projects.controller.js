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
            res.set('Content-Type', 'application/json');
            res.status(200).send(rows);
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
            let projectId;
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].constructor === Array) {
                    if (rows[i][0].projectId) {
                        projectId = rows[i][0].projectId;
                        break;
                    }
                }
            }
            res.status(201).send(`${projectId}`);
        }
    });
};

/**
 * View project details
 */
exports.get = function (req, res) {
    projects.getProjectDetail(req.params.id, function (err, projectDetail) {
        if (err) {
            res.status(500).send("Failed to fetch project details\nError details: " + err);
        } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send(projectDetail);
        }
    });
};

/**
 * Update project (open/close)
 */
exports.update = function (req, res) {
    projects.toggle([String(req.body.open), req.params.id], function (err, result) {
        if (err) {
            res.status(400).send("Malformed project data\nError details: " + err);
        } else {
            res.status(201).send("OK");
        }
    });
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
    let b = req.body;
    if (b.id != req.user.id) {
        res.status(400).send("The pledge's user ID does not agree with current session credential(token)\n");
    } else {
        projects.pledge([b.id, req.params.id, null, b.amount, String(b.anonymous)], function (err, result) {
            if (err || result.affectedRows === 0) {
                res.status(400).send("Bad user, project, or pledge details\nError details: " + err);
            } else {
                res.status(200).send("OK");
            }
        });
    }
};