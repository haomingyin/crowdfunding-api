const jwt = require("jsonwebtoken");
const MemoryCache = require("fast-memory-cache");

const PRIVATE_KEY = "U3F8MXXqKqkverk8QkTF1s7gNaaui1Bc";
const EXPIRATION = 60 * 60 * 2; // token is valid for 2 hours

const TOKEN_BLACKLIST_CACHE = new MemoryCache();

exports.JWT_INVOKED = JWT_INVOKED = 3;
exports.JWT_EXPIRED = JWT_EXPIRED = 2;
exports.JWT_VALID = JWT_VALID = 1;
exports.JWT_INVALID = JWT_INVALID = 0;

exports.sign = function (data) {
    return jwt.sign(data, PRIVATE_KEY, {expiresIn: EXPIRATION});
};

/**
 * Verifies a given token, and return the validation results.
 * @param token a jwt token
 * @returns if valid, returns {decoded: {DATA}, status: JWT_VALID} Otherwise return JWT_INVOKED if token has been
 * invoked. JWT_EXPIRED if token is expired, JWT_INVALID if token is not invalid.
 */
exports.verify = function (token) {
    try {
        let decoded = {"decoded": jwt.verify(token, PRIVATE_KEY), "status": JWT_VALID};
        // if no error, then token is valid. Check if the valid token has been invoked
        if (isInvoked(token)) {
            return {status: JWT_INVOKED};
        } else {
            return decoded;
        }
    } catch (err) {
        if (err.message === "jwt expired") {
            return {status: JWT_EXPIRED};
        }
        else {
            return {status: JWT_INVALID};
        }
    }
};

exports.invoke = function (token) {
    try {
        TOKEN_BLACKLIST_CACHE.set(token, 1, EXPIRATION);
    } catch (err) {
        console.log(err);
    }
};

exports.isInvoked = isInvoked = function (token) {
    try {
        return TOKEN_BLACKLIST_CACHE.get(token) !== undefined;
    } catch (err) {
        return false; // if there is an error, return that token is not invoked
    }
};