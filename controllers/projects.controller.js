/**
 * Controller for projects related manipulations.
 *
 * Author: Haoming Yin
 * Date: 8/8/2017
 */

const projects = require("../models/projects.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const _ = require("lodash");

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
            let projectId = "Error: Failed to create a project";
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
            if (_.isEmpty(projectDetail)) {
                res.status(404).send("Project does not exist");
            } else {
                res.set('Content-Type', 'application/json');
                res.status(200).send(projectDetail);
            }
        }
    });
};

/**
 * Update project (open/close)
 */
exports.update = function (req, res) {
    projects.toggle([String(req.body.open), req.params.id], function (err) {
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
    projects.getImageUri(req.params.id, function (err, rows) {
        if (err || rows.length === 0) {
            res.status(400).send("Malformed request\nError: Project does not exist")
        } else {
            let filePath = path.join(__dirname, '..', rows[0].imageUri);
            res.set("Content-Type", "image/png");
            fs.readFile(filePath, function (err, data) {
                if (rows[0].imageUri === "uploads/unavailable.png") {
                    res.status(404).send(data);
                } else {
                    res.status(200).send(data);
                }
            });
        }
    });
};


let upload = multer({
    'storage': multer.diskStorage({
        'destination': function (req, file, cb) {
            cb(null, path.join(__dirname, '..', 'uploads'));
        },
        'filename': function (req, file, cb) {
            if (file.mimetype === 'image/png') {
                req.imageUri = `project-${req.params.id}-${moment().format('YMMDDHHmmSSS')}.png`;
                cb(null, req.imageUri)
            } else if (file.mimetype === 'image/jpeg') {
                req.imageUri = `project-${req.params.id}-${moment().format('YMMDDHHmmSSS')}.jpeg`;
                cb(null, req.imageUri)
            } else {
                cb("Error: The server only accept 'jpeg' or 'png' image files");
            }
        }
    })
}).any();

exports.uploadImage = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            res.status(400).send(err);
        } else {
            projects.updateProjectImage(`uploads/${req.imageUri}`, req.params.id, function (err1, result) {
                if (err1) {
                    res.status(500).send(err1);
                }
            });
            res.status(200).send("OK");
        }
    });
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
                res.status(400).send("Malformed request\nBad user, project, or pledge details\nError details: " + err);
            } else {
                res.status(200).send("OK");
            }
        });
    }
};
