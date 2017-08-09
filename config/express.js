/**
 * Created by haoming on 7/08/17.
 */

const express = require('express');
const bodyParser = require('body-parser');

exports = module.exports = function () {
    const app = express();

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    require('../routes/route.js')(app);

    return app;
};
