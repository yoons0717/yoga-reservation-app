const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'center', 'member'], default: 'member' },
  center: { type: mongoose.Schema.Types.ObjectId, ref: 'Center' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
