const Bill = require('../models/Bill');
const BillDetail = require('../models/BillDetail');

exports.payBill = async (req, res) => {
    try {
        const { subscriberNo, month, amount } = req.body;

        if (!subscriberNo || !month || amount === undefined) {
            return res.status(400).json({
                status: 'Error',
                message: 'subscriberNo, month ve amount alanları gereklidir.'
            });
        }

        const bill = await Bill.findOne({ subscriberNo, month, paid: false });

        if (!bill) {
            return res.status(404).json({ status: 'Error', message: 'Fatura bulunamadı veya zaten ödenmiş.' });
        }

        if (amount > bill.totalAmount) {
            return res.status(400).json({
                status: 'Error',
                message: 'Ödeme miktarı fatura tutarını aşmaktadır.',
                remainingAmount: bill.totalAmount
            });
        }

        const remainingAmount = bill.totalAmount - amount;

        if (remainingAmount > 0) {
            bill.totalAmount = remainingAmount;
            await bill.save();
        } else {
            bill.paid = true;
            await bill.save();
        }

        const billDetail = new BillDetail({
            bill: bill._id,
            description: `Ödeme yapıldı: ${amount}`,
            amount: amount,
            date: new Date()
        });
        await billDetail.save();

        res.json({
            status: 'Successful',
            message: 'Fatura ödemesi başarıyla gerçekleştirildi.',
            remainingAmount: remainingAmount
        });

    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({
            status: 'Error',
            message: 'Fatura ödeme işlemi sırasında bir hata oluştu: ' + error.message
        });
    }
};

exports.adminAddBill = async (req, res) => {
    try {
        const { subscriberNo, month, totalAmount } = req.body;

        if (!subscriberNo || !month || !totalAmount) {
            return res.status(400).json({
                status: 'Error',
                message: 'subscriberNo, month ve totalAmount alanları gereklidir.'
            });
        }

        const existingBill = await Bill.findOne({ subscriberNo, month });
        if (existingBill) {
            return res.status(409).json({
                status: 'Error',
                message: 'Bu abone numarası ve ay için zaten bir fatura kaydı mevcut.',
                transactionStatus: false
            });
        }

        const newBill = new Bill({ subscriberNo, month, totalAmount });

        const savedBill = await newBill.save();

        res.status(201).json({
            status: 'Successful',
            message: 'Yeni fatura başarıyla eklendi.',
            transactionStatus: true
        });

    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'Fatura eklenirken bir hata oluştu: ' + error.message,
            transactionStatus: false
        });
    }
};