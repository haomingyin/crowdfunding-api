const db = require("../config/db");

/**
 * Create a new user into database.
 * @param param an array of [username, password, location, email]
 * @param cb
 */
exports.addUser = function (param, cb) {
    const sql = "INSERT INTO users (username, password, location, email) VALUES (?, ?, ?, ?);";
    db.getPool().query(sql, param, function (err, result) {
        cb(err, result);
    });
};

/**
 * Fetch a user by username and password
 * @param param an array of [username, password]
 * @param cb
 */
exports.login = function (param, cb) {
    const sql = "SELECT * FROM users WHERE username=? AND password=?";
    db.getPool().query(sql, param, function (err, result) {
        cb(err, result);
    });
};

/**
 * Fetch a user by the given id
 * @param id
 * @param cb
 */
exports.getUserById = function (id, cb) {
    let sql = "SELECT id, username, location, email FROM users WHERE id=?";
    db.getPool().query(sql, [id], function (err, result) {
        cb(err, result);
    });
};