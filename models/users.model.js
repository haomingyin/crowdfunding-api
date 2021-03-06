const db = require("../config/db");

/**
 * Create a new user into database.
 * @param param an array of [username, password, location, email]
 * @param cb
 */
exports.addUser = function (param, cb) {
    const sql = "INSERT INTO users (username, password, location, email) VALUES (?, ?, ?, ?);";
    db.getPool().query(sql, param, cb);
};

/**
 * Fetch a user by username and password
 * @param param an array of [username, password]
 * @param cb
 */
exports.login = function (param, cb) {
    const sql = "SELECT id, username, location, email FROM users WHERE username=? AND password=?";
    db.getPool().query(sql, param, cb);
};

/**
 * Fetch a user by the given id
 * @param id
 * @param cb
 */
exports.getUserById = function (id, cb) {
    let sql = "SELECT id, username, location, email FROM users WHERE id=?";
    db.getPool().query(sql, [id], cb);
};

/**
 * Delete a user by the given id
 * @param id
 * @param cb
 */
exports.delete = function (id, cb) {
    let sql = "DELETE FROM users WHERE id=?;";
    db.getPool().query(sql, [id], cb);
};

exports.update = function (params, cb) {
    let sql = "UPDATE users SET username=?, password=?, location=?, email=? WHERE id=?;";
    db.getPool().query(sql, params, cb);
};

/**
 * Get all users' information including password. NOT SAFE!!
 * @param cb
 */
exports.getAllUsers = function (cb) {
    db.getPool().query("SELECT * FROM users;", cb);
};