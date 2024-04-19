const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  subscriberNo: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  details: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'billdetails',
    },
  ],
});

const Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;