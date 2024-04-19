const jwt = require('jsonwebtoken');
const secretKey = 'k:DU9f&dKW8Fka2cT54zvM2L$dR7VJ!';

exports.generateToken = (userData) => {
    return jwt.sign(userData, secretKey, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};
