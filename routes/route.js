/**
 * Route for all API requests.
 *
 * Author: Haoming Yin
 * Date: 8/8/2017
 */

const projects = require("../controllers/projects.controller");
const rewards = require("../controllers/rewards.controller");
const users = require('../controllers/users.controller');

exports = module.exports = function (app) {

    // routes for projects
    app.route("/projects")
        .get(projects.listAll)
        .post(projects.create);

    app.route("/projects/:id")
        .get(projects.get)
        .put(projects.update);

    app.route("/projects/:id/image")
        .get(projects.getImage)
        .put(projects.updateImage);

    app.route("/projects/:id/pledge")
        .post(projects.pledge);

    // routes for rewards
    app.route("/projects/:id/rewards")
        .get(rewards.get)
        .put(rewards.update);

    // routes for users
    app.route("/users")
        .post(users.create)
        .get(users.getAll);

    app.route("/users/login")
        .post(users.login);

    app.route("/users/logout")
        .post(users.logout);

    app.route("/users/:id")
        .get(users.get)
        .put(users.update)
        .delete(users.delete);
};