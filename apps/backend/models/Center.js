// models/Center.js
const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Center', centerSchema);
