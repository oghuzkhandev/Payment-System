const express = require('express');
const router = express.Router();
const mobileProviderController = require('../controllers/mobileProviderController');
const loginController = require('../controllers/loginController');
const Bill = require('../models/Bill');

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
 * /bills/get-queryBill:
 *   get:
 *     summary: Belirtilen abone numarası ve ay için fatura detaylarını sorgular.
 *     tags:
 *       - Billing
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subscriberNo
 *         required: true
 *         schema:
 *           type: string
 *         description: Sorgulanacak abone numarası.
 *       - in: query
 *         name: month
 *         required: false
 *         schema:
 *           type: string
 *         description: Sorgulanacak ay, opsiyonel parametre.
 *     responses:
 *       200:
 *         description: Fatura detayları başarıyla döndürüldü.
 *       404:
 *         description: Fatura bulunamadı.
 *       500:
 *         description: Sorgu sırasında bir sunucu hatası oluştu.
 */
router.get("/get-queryBill", loginController.authenticateToken, mobileProviderController.queryBill);


/**
 * @openapi
 * /bills/get-queryBillDetailed:
 *   get:
 *     summary: Belirtilen abone numarası ve ay için detaylı fatura bilgisi sorgular.
 *     tags:
 *       - Billing
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subscriberNo
 *         required: true
 *         schema:
 *           type: string
 *         description: Abone numarası.
 *       - in: query
 *         name: month
 *         required: false
 *         schema:
 *           type: string
 *         description: Ay bilgisi, opsiyonel parametre.
 *     responses:
 *       200:
 *         description: Fatura detayları başarıyla döndürüldü.
 *       404:
 *         description: Fatura bulunamadı.
 *       500:
 *         description: Sorgu sırasında bir sunucu hatası oluştu.
 */

router.get("/get-queryBillDetailed", loginController.authenticateToken, mobileProviderController.queryBillDetailed);


module.exports = router;
