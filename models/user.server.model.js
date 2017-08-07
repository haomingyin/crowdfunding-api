/**
 * Created by haoming on 7/08/17.
 */

const db = require('../config/db.js');

exports.getAll = function(cb){
    db.get().query("SELECT * FROM Users", function (err, result) {
        if (err) return done({"ERROR": "Failed to retrieve data from database."});
        cb(result);
    });
};

exports.getOne = function(userId, cb){
    db.get().query("SELECT * FROM Users WHERE user_id=?", [userId], function (err, result) {
        if (err) return cb(err);
        cb(result);
    })
};

exports.insert = function(username, cb){
    db.get().query("INSERT INTO Users (username) VALUES (?)", [username], function (err, result) {
        if (err) return cb(err);
        cb(result);
    });
};

exports.alter = function(){
    return null;
};

exports.remove = function(){
    return null;
};