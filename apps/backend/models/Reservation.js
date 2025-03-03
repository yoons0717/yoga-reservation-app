const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }, // 예약한 수업 ID
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 수강생 ID
  status: { type: String, enum: ['reserved', 'canceled'], default: 'reserved' }, // 예약 상태
  createdAt: { type: Date, default: Date.now }, // 예약 시간
});

module.exports = mongoose.model('Reservation', reservationSchema);
