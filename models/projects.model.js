const db = require("../config/db");
const rewards = require("./rewards.model");

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

/**
 * Get blobs for all open project
 * @param offset
 * @param limit
 * @param cb
 */
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

/**
 * Toggles project status, either open / closed
 * @param params
 * @param cb
 */
exports.toggle = function (params, cb) {
    let sql = "UPDATE projects SET open=? WHERE id=?";
    db.getPool().query(sql, params, function (err, result) {
        cb(err, result);
    });
};

function fetchProjectDetail(projectId, cb) {
    db.getPool().query("SELECT * FROM project_detail WHERE id=?", [projectId], function (err, rows) {
        cb(err, rows);
    });
}

function fetchCreators(projectId, cb) {
    db.getPool().query("SELECT creator AS id, name FROM creates WHERE project=?", [projectId], function (err, rows) {
        cb(err, rows);
    });
}

function fetchBackers(projectId, cb) {
    // TODO: for now only fetches non-anonymous backers
    db.getPool().query("SELECT pl.amount, u.username AS name FROM pledges AS pl LEFT JOIN users AS u ON pl.user = u.id " +
        "WHERE pl.project=? AND pl.anonymous='false'", [projectId], function (err, rows) {
        cb(err, rows);
    });
}

function formatProjectDetail(project, creators, rewards, backers) {
    try {
        return {
            project: {
                id: project.id,
                creationDate: project.timestamp,
                data: {
                    title: project.title,
                    subtitle: project.subtitle,
                    description: project.description,
                    imageUri: project.imageUri,
                    target: project.target,
                    "creators": creators,
                    "rewards": rewards,
                }
            },
            progress: {
                target: project.target,
                currentPledged: project.currentPledged || 0,
                numberOfBackers: project.numberOfBackers || 0
            },
            "backers": backers
        };

    } catch (err) {
        return {};
    }
}

/**
 * Get projects details
 * @param projectId
 * @param cb
 */
exports.getProjectDetail = function (projectId, cb) {
    fetchProjectDetail(projectId, function (err1, projectDetail) {
        if (err1) return cb(err1, null);
        if (projectDetail.length === 0) return cb(null, {});

        fetchCreators(projectId, function (err2, creators) {
            if (err2) return cb(err2, null);

            rewards.getByProjectID(projectId, function (err3, rewards) {
                if (err3) return cb(err3, null);

                fetchBackers(projectId, function (err4, backers) {
                    if (err4) return cb(err4, null);

                    cb(null, formatProjectDetail(projectDetail[0], creators, rewards, backers));
                });
            })
        });

    });
};

