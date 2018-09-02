const jwt        = require('jsonwebtoken');
const privateKey = '%%key%%';

exports.sign = (data) => {
    return new Promise((resolve, reject) => {
        jwt.sign({
            "uuid" : data,
            iat : Math.floor(Date.now() / 1000)
        }, privateKey, {
            expiresIn : "3d"
        }, (err, token) => {
            if (err) { reject(err); }
            else resolve(token);
        });
    });
};

exports.verify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
        });
    });
};
