const jwt = require('jsonwebtoken');
const secretKey = 'k:DU9f&dKW8Fka2cT54zvM2L$dR7VJ!';

exports.login = (req, res) => {
    try {
        const username = req.body.username;
        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }
        const user = { username: username };

        const accessToken = jwt.sign(user, secretKey, { expiresIn: '1h' });

        console.log("Token:", accessToken);
        res.json({ accessToken: accessToken });
    } catch (error) {
        console.error("Login failed:", error);
        res.status(500).json({ error: "Login failed" });
    }
};

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token){
        return res.sendStatus(401); // Token yoksa 401 gönder
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token.' });
        }
        req.user = user;
        next();
    });
}
