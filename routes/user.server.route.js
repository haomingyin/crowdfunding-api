/**
 * Created by haoming on 7/08/17.
 */

const users = require('../controllers/user.server.controller');

exports = module.exports = function (app) {
    app.route('/api/users')
        .get(users.list)
        .post(users.create);

    app.route('/api/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);
};
