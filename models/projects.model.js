const db = require("../config/db");

exports.getProjectOwner = function (id, cb) {
    let sql = "SELECT creator FROM projects WHERE id=?;";
    db.getPool().query(sql, [id], function (err, rows) {
        cb(err, rows);
    });
};