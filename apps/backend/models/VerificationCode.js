const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model('VerificationCode', verificationSchema);
