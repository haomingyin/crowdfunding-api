/**
 * Created by haoming on 7/08/17.
 */

const express = require('config/express');
const bodyParser = require('body-parser');

exports = module.exports = function () {
    const app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // require('../app/routes/user.server.route.js')(app);

    return app;
};
