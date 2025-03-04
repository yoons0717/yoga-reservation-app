const express = require('express');
const Reservation = require('../models/Reservation');
const Class = require('../models/Class');
const { authenticate, checkRole } = require('../middlewares/auth');

const router = express.Router();

// 학생 전용: 인증 및 학생 권한 체크 적용
router.use(authenticate);
router.use(checkRole('student'));

// 학생이 수업 예약 생성
router.post('/', async (req, res) => {
  try {
    const { classId } = req.body;
    const studentId = req.user.userId;

    const yogaClass = await Class.findById(classId);
    if (!yogaClass) return res.status(404).json({ message: 'Class not found' });

    const existing = await Reservation.findOne({ classId, studentId, status: 'reserved' });
    if (existing) return res.status(400).json({ message: 'Already reserved' });

    const count = await Reservation.countDocuments({ classId, status: 'reserved' });
    if (count >= yogaClass.maxParticipants) {
      return res.status(400).json({ message: 'Class is full' });
    }

    const reservation = new Reservation({ classId, studentId });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// 학생이 자신의 예약 목록 조회
router.get('/', async (req, res) => {
  try {
    const studentId = req.user.userId;
    const reservations = await Reservation.find({ studentId }).populate('classId');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// 학생이 자신의 예약 취소
router.delete('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findOneAndDelete({
      _id: req.params.id,
      studentId: req.user.userId,
    });
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.status(200).json({ message: 'Reservation cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
