const mongoose = require('mongoose');

const BillDetailSchema = new mongoose.Schema({
  bill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bill',
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const BillDetail = mongoose.model('BillDetails', BillDetailSchema);

module.exports = BillDetail;