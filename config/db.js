/**
 * Created by haoming on 7/08/17.
 */

const mysql = require('mysql');
const fs = require("fs");

const state = {
    pool: null
};

exports.connect = function (cb) {
    state.pool = mysql.createPool({
        host: process.env.SENG365_MYSQL_HOST || 'localhost',
        port: process.env.SENG365_MYSQL_PORT || 6033,
        user: process.env.SENG365_MYSQL_USER || 'root',
        password: 'secret',
        database: process.env.SENG365_MYSQL_DATABASE || 'mysql',
        multipleStatements: true,
        connectionLimit: 100
    });
    cb();
};

exports.getPool = function () {
    return state.pool;
};

/**
 * Initialize database by reading sql DDL file and executing all the queries
 * @param cb callback function(error_msg)
 */
exports.initialize = function (cb) {
    fs.readFile(__dirname + "/init.sql", function (err, data) {
        if (err) {
            console.log(err);
            cb(err);
        } else {
            exports.getPool().query(data.toString(), function (err2, result) {
                if (err2) {
                    console.log(err2);
                    cb(err2);
                } else {
                    // console.log(result);
                    cb(null);
                }
            });
        }
    });
};
