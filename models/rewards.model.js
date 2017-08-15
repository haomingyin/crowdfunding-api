const db = require("../config/db");

/**
 * Gets all rewards associated with the given project.
 * @param projectId
 * @param cb
 */
exports.getByProjectID = function (projectId, cb) {
    let sql = "SELECT id, amount, description FROM rewards WHERE project=?;";
    db.getPool().query(sql, [projectId], cb);
};

function getUpdateRewardsSQL(projectId, rewards) {
    let sql = "START TRANSACTION;";
    let params = [];

    for (let i = 0; i < rewards.length; i++) {
        sql += "UPDATE rewards SET amount=?, description=? WHERE project=? AND id=?;";
        params.push(rewards[i].amount);
        params.push(rewards[i].description);
        params.push(projectId);
        params.push(rewards[i].id);
    }

    sql += "COMMIT;";

    return {"sql": sql, "params": params};
}

/**
 * Updates the given projects' reward with passed in rewards array
 * @param projectId
 * @param rewards
 * @param cb
 */
exports.updateByProjectID = function (projectId, rewards, cb) {
    let transaction = getUpdateRewardsSQL(projectId, rewards);

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