const Bill = require("../models/Bill");

exports.queryUnpaidBills = async (req, res) => {
    try {
        const { subscriberNo } = req.query;
        if (!subscriberNo) {
            return res.status(400).json({ message: 'Abone numarası gereklidir.' });
        }

        const unpaidBills = await Bill.find({
            subscriberNo: subscriberNo,
            paid: false
        });

        if (unpaidBills.length > 0) {
            res.json(unpaidBills);
        } else {
            res.status(404).json({ message: 'Ödenmemiş fatura bulunamadı.' });
        }
    } catch (error) {
        console.error('Hata oluştu:', error);
        res.status(500).json({ message: 'Sunucu hatası, ödenmemiş faturalar alınamadı.' });
    }
};