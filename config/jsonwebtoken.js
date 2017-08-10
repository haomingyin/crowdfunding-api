const jwt = require("jsonwebtoken");
const privateKey = "U3F8MXXqKqkverk8QkTF1s7gNaaui1Bc";

exports.JWT_EXPIRED = JWT_EXPIRED = 2;
exports.JWT_VALID = JWT_VALID = 1;
exports.JWT_INVALID = JWT_INVALID = 0;

exports.sign = function (data) {
    return jwt.sign(data, privateKey, {expiresIn: 60 * 60 * 24});
};

exports.verify = function (token) {
    try {
        return {"decoded": jwt.verify(token, privateKey), "status": JWT_VALID};
    } catch (err) {
        if (err.message === "jwt expired") {
            return JWT_EXPIRED;
        }
        else {
            return JWT_INVALID;
        }
    }
};