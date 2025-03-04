const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 사용자 ID
  type: { type: String, enum: ['30일', '60일', '90일'], required: true }, // 수강권 종류
  passCount: { type: Number, required: true }, // 수강권 개수
  usedPasses: { type: Number, default: 0 }, // 사용한 수강권 개수
  passStartDate: { type: Date, required: true }, // 수강권 시작 날짜
  passEndDate: { type: Date, required: true }, // 수강권 종료 날짜
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pass', passSchema);
