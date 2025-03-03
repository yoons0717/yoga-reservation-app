const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true }, // 수업 날짜
  startTime: { type: String, required: true }, // 예: "10:00 AM"
  endTime: { type: String, required: true }, // 예: "11:00 AM"
  maxParticipants: { type: Number, default: 10 }, // 최대 수강 인원
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Class', classSchema); // 'Class'라는 MongoDB 컬렉션 생성
