/**
 * Created by hyi25 on 10/08/17.
 */
const db = require("../config/db");

a = {};
// reg exp for ID number
console.log(/^[0-9]+$/.test("142"));
console.log(/\S+@\S+\.\S+/.test("dfjksflsd@haomingyin.com"));

b = {"a": 123};
console.log(b);

console.log(typeof b.user === 'undefined');


const jwt = require("jsonwebtoken");
console.log(jwt.sign({id: 1, name: "haoming"}, "abc", {expiresIn: 30}));
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

db.connect(del);

function del() {
    let sql = "DELETE FROM users WHERE id=?;";
    db.getPool().query(sql, [2], function (err, result) {
        console.log(err);
        console.log(result);
    });
}
