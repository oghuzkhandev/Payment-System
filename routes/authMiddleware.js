const User = require('../models/User'); 
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const secretKey = 'k:DU9f&dKW8Fka2cT54zvM2L$dR7VJ!';

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Kullanıcı girişi yapar ve JWT token döndürür.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Başarılı giriş.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token.
 *       401:
 *         description: Kullanıcı adı veya şifre hatalı.
 *       500:
 *         description: Sunucu hatası.
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Veritabanında kullanıcıyı username ve password ile ara
        const user = await User.findOne({ username: username, password: password });
        if (user) {
            // Kullanıcı bulunursa, JWT token oluştur
            const token = jwt.sign({ id: user._id, username: user.username }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        } else {
            // Kullanıcı bulunamazsa hata mesajı gönder
            res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası', error: err.message });
    }
});

module.exports = router;
