const db = require("../config/db");

/**
 * Query all columns from creates table with given creator id and project id
 * @param params
 * @param cb
 */
exports.getProjectOwner = function (params, cb) {
    let sql = "SELECT * FROM creates WHERE creator=? AND project=?;";
    db.getPool().query(sql, params, function (err, rows) {
        cb(err, rows);
    });
};

/**
 * Generate a transaction sql string for creating a project with related creator and rewards records.
 * @param project
 * @returns {object} {sql, params}
 */
function getCreateProjectSQL(project) {
    let sql = "START TRANSACTION; ";

    sql += "INSERT INTO projects (title, subtitle, description, imageUri, target) VALUES (?, ?, ?, ?, ?); ";
    let params = [project.title, project.subtitle, project.description, project.imageUri, project.target];

    sql += "SET @projectId = LAST_INSERT_ID(); ";

    for (let i = 0; i < project.creators.length; i++) {
        sql += "INSERT INTO creates (creator, name, project) VALUES (?, ?, @projectId); ";
        params.push(project.creators[i].id);
        params.push(project.creators[i].name);
    }

    for (let i = 0; i < project.rewards.length; i++) {
        sql += "INSERT INTO rewards (project, amount, description) VALUES (@projectId, ?, ?); ";
        params.push(project.rewards[i].amount);
        params.push(project.rewards[i].description);
    }

    sql += "SELECT @projectId AS projectId; ";
    sql += "COMMIT;";

    return {"sql": sql, "params": params};
}

/**
 * Creates a new project
 * @param project
 * @param cb
 */
exports.create = function (project, cb) {
    let transaction = getCreateProjectSQL(project);

    db.getPool().getConnection(function (err, connection) {
        if (err) {
            connection.release();
            cb(err, null);
        } else {
            connection.query(transaction.sql, transaction.params, function (err1, result1) {
                if (err1) {
                    connection.query("ROLLBACK;", [], function () {
                        connection.release();
                        cb(err1, result1);
                    });
                } else {
                    connection.release();
                    cb(err1, result1);
                }
            });
        }
    });
};

exports.getAll = function (offset, limit, cb) {
    let sql;
    if (offset && limit) {
        sql = "SELECT id, title, subtitle, imageUri FROM projects WHERE open!='false' LIMIT ?,?;";
    } else {
        sql = "SELECT id, title, subtitle, imageUri FROM projects open!='false';";
    }

    try {
        db.getPool().query(sql, [Number(offset), Number(limit)], function (err, rows) {
            cb(err, rows);
        });
    } catch (err) {
        cb(err, null);
    }
};

exports.toggle = function (params, cb) {
    let sql = "UPDATE projects SET open=? WHERE id=?";
    db.getPool().query(sql, params, function (err, result) {
        cb(err, result);
    });
};