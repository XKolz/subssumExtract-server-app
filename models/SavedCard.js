const mongoose = require('mongoose');

const SavedCardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardNumber: { type: String, required: true },
  cardExpiry: { type: String, required: true }
});

module.exports = mongoose.model('SavedCard', SavedCardSchema);
