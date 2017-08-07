/**
 * Created by haoming on 7/08/17.
 */

const mysql = require('mysql');

const state = {
    pool: null
};

exports.connect = function (cb) {
    state.pool = mysql.createPool({
        host: process.env.SENG365_MYSQL_HOST || 'localhost',
        port: process.env.SENG365_MYSQL_PORT || 3306,
        user: 'root',
        password: 'secret',
        database: 'mysql'
    });
    cb();
};

exports.getPool = function () {
    return state.pool;
};
