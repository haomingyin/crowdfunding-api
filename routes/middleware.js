const jwt = require("../config/jsonwebtoken");
const projects = require("../models/projects.model");
const validator = require("is-my-json-valid");

const userSchema = require("../models/users.schema.json");
const projectSchema = require("../models/projects.schema.json");

/**
 * Middleware checks the token is valid.
 * @param req
 * @param res
 * @param next
 */
exports.validateToken = function (req, res, next) {
    let validation = jwt.verify(req.get("X-Authorization"));
    if (validation.status === jwt.JWT_VALID) {
        req.user = validation.decoded; // put decoded user info into req.user
        next();
    } else {
        res.status(401).send("Unauthorized\n");
    }
};

/**
 * Middleware checks if the request is from the project owner
 * @param req
 * @param res
 * @param next
 */
exports.validateProjectOwner = function (req, res, next) {
    projects.getProjectOwner([req.user.id, req.params.id], function (err, rows) {
        if (err) {
            res.status(400).send("Invalid project ID\n");
        } else {
            if (rows.length !== 0) {
                next();
            } else {
                res.status(403).send("Forbidden to access a project that you do not own\n");
            }
        }
    });
};

/**
 * Middleware checks if the request is not from the project owner.
 * @param req
 * @param res
 * @param next
 */
exports.validateNotOwner = function (req, res, next) {
    projects.getProjectOwner([req.user.id, req.params.id], function (err, rows) {
        if (err) {
            res.status(400).send("Invalid project ID supplied\n");
        } else {
            if (rows.length === 0) {
                next();
            } else {
                res.status(403).send("Forbidden to access your own project\n");
            }
        }
    });
};

/**
 * Middleware checks if the query ID is unify with decoded user ID
 * @param req
 * @param res
 * @param next
 */
exports.validateQueryUserID = function (req, res, next) {
    try {
        if (req.user.id === Number(req.params.id)) {
            next();
        } else {
            res.status(403).send("Forbidden as account not owned\n");
        }
    } catch (err) {
        res.status(400).send("Invalid user ID supplied\n" + err + "\n");
    }
};

/**
 * Middleware checks if the incoming user JSON conforms to the preset user schema
 * @param req
 * @param res
 * @param next
 */
exports.validateUserJSON = function (req, res, next) {
    try {
        let validate = validator(userSchema, {verbose: true});
        if (validate(req.body)) {
            next();
        } else {
            res.status(400).send("Malformed user data\nError details: " + JSON.stringify(validate.errors));
        }
    } catch (err) {
        res.status(400).send("Malformed user data\nError details: " + err);
    }
};

/**
 * Middleware checks if the incoming project JSON conforms to the preset project schema
 * @param req
 * @param res
 * @param next
 */
exports.validateProjectJSON = function (req, res, next) {
    try {
        let validate = validator(projectSchema, {verbose: true});
        if (validate(req.body)) {
            next();
        } else {
            res.status(400).send("Malformed project data\nError details:" + JSON.stringify(validate.errors));
        }
    } catch (err) {
        res.status(400).send("Malformed project data\nError details:" + err);
    }
};