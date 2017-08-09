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
        port: process.env.SENG365_MYSQL_PORT || 3306,
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

let status = {isReady: false, result: {}};
exports.status = status;

exports.initialize = function (cb) {

    exports.connect(function () {
        fs.readFile("./init.sql", "utf8", function (err, data) {
            if (err) {
                return console.log(err);
            }

            exports.getPool().query(data, function (err, res) {
                if (err) {
                    return console.log(err);
                } else {
                    status.isReady = true;
                    status.result = res;

                    cb();
                }
            });
        });
    })

};
