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

    // routes for projects
    app.get("/projects", projects.listAll);
    app.post("/projects", mw.validateToken, mw.validateProjectJSON, projects.create);

    app.get("/projects/:id", projects.get);
    app.put("/projects/:id", mw.validateToken, mw.validateProjectOwner, projects.update);

    app.get("/projects/:id/image", projects.getImage);
    app.put("/projects/:id/image", mw.validateToken, mw.validateProjectOwner, projects.updateImage);

    app.post("/projects/:id/pledge", mw.validateToken, mw.validateNotOwner, projects.pledge);

    // routes for rewards
    app.get("/projects/:id/rewards", rewards.get);
    app.put("/projects/:id/rewards", mw.validateToken, mw.validateProjectOwner, rewards.update);

    // routes for users
    app.post("/users", mw.validateUserJSON, users.create);
    app.get("/users", users.getAll);

    app.post("/users/login", users.login);

    app.post("/users/logout", mw.validateToken, users.logout);

    app.delete("/users/:id", mw.validateToken, mw.validateQueryUserID, users.delete);
    app.put("/users/:id", mw.validateToken, mw.validateQueryUserID, mw.validateUserJSON, users.update);
    app.get("/users/:id", users.get);
};