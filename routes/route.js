/**
 * Route for all API requests.
 *
 * Author: Haoming Yin
 * Date: 8/8/2017
 */

const projects = require("../controllers/projects.controller");
const rewards = require("../controllers/rewards.controller");
const users = require("../controllers/users.controller");

const middleware = require("./middleware");

exports = module.exports = function (app) {

    // routes for projects
    app.get("/projects", projects.listAll);
    app.post("/projects", middleware.validateToken, projects.create);

    app.get("/projects/:id", projects.get);
    app.put("/projects/:id", middleware.validateToken, middleware.validateProjectOwner, projects.update);

    app.get("/projects/:id/image", projects.getImage);
    app.put("/projects/:id/image", middleware.validateToken, middleware.validateProjectOwner, projects.updateImage);

    app.post("/projects/:id/pledge", middleware.validateToken, middleware.validateNotOwner, projects.pledge);

    // routes for rewards
    app.get("/projects/:id/rewards", rewards.get);
    app.put("/projects/:id/rewards", middleware.validateToken, middleware.validateProjectOwner, rewards.update);

    // routes for users
    app.route("/users")
        .post(users.create)
        .get(users.getAll);

    app.post("/users/login", users.login);

    app.post("/users/logout", middleware.validateToken, users.logout);

    app.delete("/users/:id", middleware.validateToken, middleware.validateQueryID, users.delete);
    app.put("/users/:id", middleware.validateToken, middleware.validateQueryID, users.update);
    app.get("/users/:id", middleware.validateToken, users.get);
};