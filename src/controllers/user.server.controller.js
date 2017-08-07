/**
 * Created by haoming on 7/08/17.
 */

const User = require('../models/user.server.model');

exports.list = function (req, res) {
    User.getAll(function (result) {
        res.json(result);
    })
};

exports.create = function (req, res) {
    User.insert(req.body.username, function (result) {
        res.json(result);
    });
};

exports.read = function (req, res) {
    User.getOne(req.params.userId, function (result) {
        res.json(result);
    });
};

exports.update = function (req, res) {
    return null;
};

exports.delete = function (req, res) {
    return null;
};

exports.userById = function (req, res) {
    return null;
};