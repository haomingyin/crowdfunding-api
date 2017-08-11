const jwt = require("../config/jsonwebtoken");
const projects = require("../models/projects.model");

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
    projects.getProjectOwner(req.params.id, function (err, rows) {
        if (err || rows.length === 0) {
            res.status(400).send("Invalid project ID\n");
        } else {
            if (rows[0].creator === req.user.id) {
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
    projects.getProjectOwner(req.params.id, function (err, rows) {
        if (err || rows.length === 0) {
            res.status(400).send("Invalid project ID supplied\n");
        } else {
            if (rows[0].creator !== req.user.id) {
                next();
            } else {
                res.status(403).send("Forbidden to access your own project\n");
            }
        }
    });
};

/**
 * Middleware checked if the query ID is unify with decoded user ID
 * @param req
 * @param res
 * @param next
 */
exports.validateQueryID = function (req, res, next) {
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