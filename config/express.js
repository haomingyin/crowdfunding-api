/**
 * Created by haoming on 7/08/17.
 */

const express = require('express');
const bodyParser = require('body-parser');

exports = module.exports = function () {
    const app = express();

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(function (req, res, next) {
        res.header("access-Control-Allow-Origin", "*");
        res.header("Access-Control-allow-Headers", "origin, x-Requested-With, content-Type, accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        next();
    });

    require('../routes/route.js')(app);

    return app;
};
