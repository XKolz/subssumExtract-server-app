// const mongoose = require('mongoose');

// const TransactionSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   service: { type: String, required: true },
//   amount: { type: Number, required: true },
//   totalAmount: { type: Number, required: true },
//   status: { type: String, required: true },
//   paymentMethod: { type: String, required: true },
//   transactionNo: { type: String, required: true, unique: true },
//   date: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Transaction', TransactionSchema);
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  transactionNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
