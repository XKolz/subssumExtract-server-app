const mongoose = require('mongoose');

const SequenceSchema = new mongoose.Schema({
  modelName: { type: String, required: true, unique: true },
  sequenceValue: { type: Number, default: 1 }
});

const Sequence = mongoose.model('Sequence', SequenceSchema);

module.exports = Sequence;
