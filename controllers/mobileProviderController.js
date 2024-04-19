const Bill = require('../models/Bill');
const BillDetail = require('../models/BillDetail');

exports.queryBill = async (req, res) => {
    try {
        const { subscriberNo, month } = req.query;
        if (!subscriberNo) {
            return res.status(400).json({ message: 'subscriberNo parametresi gereklidir' });
        }
        const query = month ? { subscriberNo, month } : { subscriberNo };
        const bills = await Bill.find(query);
        res.json(bills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.queryBillDetailed = async (req, res) => {
    try {
        const { subscriberNo, month } = req.query;
        if (!subscriberNo) {
            return res.status(400).json({ message: 'subscriberNo parametresi gereklidir' });
        }

        const query = { subscriberNo: subscriberNo, month: month };
        const billItem = await Bill.findOne(query);

        const ObjectId = require('mongoose').Types.ObjectId;
        const billDetailQuery = { bill: new ObjectId(billItem._id) };

        const detailedBills = await BillDetail.find(billDetailQuery);
        
        res.json(detailedBills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};