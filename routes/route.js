/**
 * Route for all API requests.
 *
 * Author: Haoming Yin
 * Date: 8/8/2017
 */

const projects = require("../controllers/projects.controller");
const rewards = require("../controllers/rewards.controller");
const users = require("../controllers/users.controller");

const mw = require("./middleware");

exports = module.exports = function (app) {

    app.set("base", "/api/v1");
    // routes for projects
    app.get("/api/v1/projects", projects.listAll);
    app.post("/api/v1/projects", mw.validateToken, mw.validateProjectJSON, projects.create);

    app.get("/api/v1/projects/:id", mw.isProjectExisted, projects.get);
    app.put("/api/v1/projects/:id", mw.validateToken, mw.isProjectExisted, mw.validateProjectOwner, projects.update);

    app.get("/api/v1/projects/:id/image", mw.isProjectExisted, projects.getImage);
    app.put("/api/v1/projects/:id/image", mw.validateToken, mw.isProjectExisted, mw.validateProjectOwner, projects.uploadImage);

    app.post("/api/v1/projects/:id/pledge", mw.validateToken, mw.isProjectExisted, mw.validateNotOwner, mw.validatePledgeJSON, projects.pledge);

    // routes for rewards
    app.get("/api/v1/projects/:id/rewards", mw.isProjectExisted, rewards.get);
    app.put("/api/v1/projects/:id/rewards", mw.validateToken, mw.isProjectExisted, mw.validateProjectOwner, mw.validateRewardJSON, rewards.update);

    // routes for users
    app.post("/api/v1/users", mw.validateUserJSON, users.create);
    //app.get("/api/v1/users", users.getAll);

    app.post("/api/v1/users/login", users.login);

    app.post("/api/v1/users/logout", mw.validateToken, users.logout);

    app.delete("/api/v1/users/:id", mw.validateToken, mw.validateQueryUserID, users.delete);
    app.put("/api/v1/users/:id", mw.validateToken, mw.validateQueryUserID, mw.validateUserJSON, users.update);
    app.get("/api/v1/users/:id", users.get);
};