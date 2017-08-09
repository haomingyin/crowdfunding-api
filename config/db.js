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
        port: 3306,
        user: 'root',
        password: 'secret',
        database: 'mysql',
        multipleStatements: true
    });
    cb();
};

exports.getPool = function () {
    return state.pool;
};

exports.initialize = function (cb) {

    fs.readFile(__dirname + "/init.sql", function (err, data) {
        if (err) {
            console.log(err);
            cb(err, null);
        } else {
            exports.getPool().query(data.toString(), function (err2, result) {
                if (err2) {
                    console.log(err2);
                    cb(err2, null);
                } else {
                    console.log(result);
                    cb(null, result);
                }
            });
        }
    });

};
