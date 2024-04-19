const express = require('express');
const router = express.Router();
const webSiteController = require('../controllers/webSiteController');
const loginController = require('../controllers/loginController');

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */



/**
 * @openapi
 * /web/payBill:
 *   put:
 *     summary: Belirli bir abone numarası ve ay için fatura ödemesi yapar.
 *     tags:
 *       - Billing
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subscriberNo
 *               - month
 *               - amount
 *             properties:
 *               subscriberNo:
 *                 type: string
 *                 description: Abone numarası.
 *               month:
 *                 type: string
 *                 description: Ödeme yapılan ay.
 *               amount:
 *                 type: number
 *                 description: Ödenen miktar.
 *     responses:
 *       200:
 *         description: Fatura başarıyla ödendi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 remainingAmount:
 *                   type: number
 *       400:
 *         description: Eksik bilgi, tüm alanlar doldurulmalıdır.
 *       404:
 *         description: Fatura bulunamadı veya zaten ödenmiş.
 *       500:
 *         description: Sunucu hatası, işlem gerçekleştirilemedi.
 */

router.put('/payBill', webSiteController.payBill);


/**
 * @openapi
 * /web/adminAddBill:
 *   post:
 *     summary: Yönetici tarafından yeni bir fatura ekler.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subscriberNo
 *               - month
 *               - totalAmount
 *             properties:
 *               subscriberNo:
 *                 type: string
 *                 description: Abone numarası.
 *               month:
 *                 type: string
 *                 description: Fatura için ay.
 *               totalAmount:
 *                 type: number
 *                 description: Fatura tutarı.
 *     responses:
 *       201:
 *         description: Yeni fatura başarıyla eklendi.
 *       400:
 *         description: Gerekli alanlar eksik.
 *       409:
 *         description: Fatura zaten mevcut.
 *       500:
 *         description: Sunucu hatası, fatura eklenemedi.
 */

router.post('/adminAddBill', loginController.authenticateToken, webSiteController.adminAddBill);

module.exports = router;
