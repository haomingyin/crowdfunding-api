/**
 * Created by hyi25 on 10/08/17.
 */

a = {};
// reg exp for ID number
console.log(/^[0-9]+$/.test("142"));
console.log(/\S+@\S+\.\S+/.test("dfjksflsd@haomingyin.com"));

b = {"a": 123};
console.log(b);

console.log(typeof b.user === 'undefined');

// const token = require("token");
// token.defaults.secret= "my secret key";
// token.defaults.timeStep = 30;
// token.defaults.cache = false;
// console.log(token.generate('1'));
// console.log(token.verify("1", "/4huMWNujJV+aqxh1UWZDV0Qh+0KrpGSwq4+gSpQSQfB+MLYMTq0ym/SayK7R/niHDccGdIo6FgwXvReIBsv2w=="));

// const jwt = require("jsonwebtoken");
// console.log(jwt.sign({id: 1, name: "haoming"}, "abc", {expiresIn: 30}));
// jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Imhhb21pbmciLCJpYXQiOjE1MDIzNTQ3NzUsImV4cCI6MTUwMjM1NDgwNX0.MCFRAPUEg3vWud2fIZNhhYvzkQs-_eHTwyN-W7N89B8", "abc", function (err, decoded) {
//     console.log(err);
//     console.log(decoded);
// });


