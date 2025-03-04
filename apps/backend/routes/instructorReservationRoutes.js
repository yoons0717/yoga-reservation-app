const express = require('express');
const Reservation = require('../models/Reservation');
const Class = require('../models/Class');
const { authenticate, checkRole } = require('../middlewares/auth');

const router = express.Router();

// 강사 전용: 인증 및 강사 권한 체크 적용
router.use(authenticate);
router.use(checkRole('instructor'));

// 강사가 자신이 등록한 수업에 대한 예약 목록 조회
router.get('/', async (req, res) => {
  try {
    const instructorId = req.user.userId;
    const classes = await Class.find({ instructor: instructorId });
    const classIds = classes.map((cls) => cls._id);
    const reservations = await Reservation.find({ classId: { $in: classIds } })
      .populate('classId')
      .populate('studentId', 'name email');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
