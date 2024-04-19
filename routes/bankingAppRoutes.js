const express = require('express');
const router = express.Router();
const bankingAppController = require('../controllers/bankingAppController');
const loginController = require('../controllers/loginController');
const Bill = require('../models/Bill');

/**
 * @openapi
 * /bank/QueryUnpaidBills:
 *   get:
 *     summary: Belirli bir abone numarasına ait ödenmemiş faturaları sorgular.
 *     tags:
 *       - Bank
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subscriberNo
 *         required: true
 *         schema:
 *           type: string
 *         description: Sorgulanacak abone numarası.
 *     responses:
 *       200:
 *         description: Abonenin ödenmemiş faturaları başarıyla döndürüldü.
 *       404:
 *         description: Ödenmemiş fatura bulunamadı.
 *       500:
 *         description: Sunucu hatası, ödenmemiş faturalar alınamadı.
 */
router.get('/QueryUnpaidBills', loginController.authenticateToken, bankingAppController.queryUnpaidBills);

module.exports = router;