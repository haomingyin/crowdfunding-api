/**
 * Created by hyi25 on 10/08/17.
 */
const db = require("../config/db");
const fs = require("fs");

a = {};
// reg exp for ID number
console.log(/^[0-9]+$/.test("142"));
console.log(/\S+@\S+\.\S+/.test("dfjksflsd@haomingyin.com"));

b = {"a": 123};
console.log(b);

console.log(typeof b.user === 'undefined');


const jwt = require("jsonwebtoken");
console.log(jwt.sign({id: "fsdfsfsfd"}, "abc", {expiresIn: 30, algorithm: "none"}));
jwt.verify(jwt.sign({id: 1, name: "haoming"}, "abc", {expiresIn: 30}), "abc", function (err, decoded) {
    console.log(err);
    console.log(decoded);
});

// const Cache = require("fast-memory-cache");
// let cache = new Cache();
//
// let error = cache.set("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", 1,  3);
//
// setTimeout(function () {
//     let data = cache.get('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
//     console.log(data);
// }, 1000);
//
// setTimeout(function () {
//     let data = cache.get('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
//     console.log(typeof data === 'undefined');
// }, 4000);

// db.connect(del);
//
// function del() {
//     let sql = "DELETE FROM users WHERE id=?;";
//     db.getPool().query(sql, [2], function (err, result) {
//         console.log(err);
//         console.log(result);
//     });
// }

// const schema = require("./schemas/projects.schema.json");
//
// const userInfo = {
//     "title": "string",
//     "subtitle": "string",
//     "description": "string12334",
//     "imageUri": "imageUri",
//     "target": 0,
//     "creators": [
//         {
//             "id": 0,
//             "name": "string"
//         }
//     ],
//     "rewards": [
//         {
//             "id": 0,
//             "amount": 0,
//             "description": "string1234"
//         }
//     ]
// };
//
// let validator = require("is-my-json-valid");
// let validate = validator(schema, {verbose: true});
//
// let validation = validate(userInfo);
// console.log(`result: ${validation}\nerrors: ${JSON.stringify(validate.errors)}`);

// fs.readFile("../uploads/test.png", function (err, data) {
//     if (err) throw err;
//     fs.writeFile("../uploads/test2.png", data, function (err2) {
//         if (err2) throw err2;
//     });
// });

const path = require("path");
console.log(path.join(__dirname, "..", "uploads")); // how to get parent dir

const moment = require("moment");
console.log(moment().format("YMMDDHHmmSSS"));
