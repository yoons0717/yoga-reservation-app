const express = require('express');
const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const Class = require('../models/Class');

const router = express.Router();

// ✅ 1. 수업 예약 (POST /api/reservations)
router.post('/', async (req, res) => {
  try {
    const { classId, studentId } = req.body;

    // 1️⃣ 수업과 사용자 존재 여부 확인
    const yogaClass = await Class.findById(classId);
    if (!yogaClass) return res.status(404).json({ message: '수업을 찾을 수 없음' });

    // 2️⃣ 예약 중복 확인 (같은 학생이 같은 수업을 예약했는지 체크)
    const existingReservation = await Reservation.findOne({
      classId,
      studentId,
      status: 'reserved',
    });
    if (existingReservation) {
      return res.status(400).json({ message: '이미 예약된 수업입니다.' });
    }

    // 3️⃣ 최대 예약 인원 초과 확인
    const reservationCount = await Reservation.countDocuments({ classId, status: 'reserved' });
    if (reservationCount >= yogaClass.maxParticipants) {
      return res.status(400).json({ message: '예약이 마감되었습니다.' });
    }

    // 4️⃣ 예약 저장
    const newReservation = new Reservation({ classId, studentId });
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error });
  }
});

// ✅ 2. 모든 예약 조회 (GET /api/reservations)
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('classId')
      .populate('studentId', 'name email');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error });
  }
});

// ✅ 3. 예약 취소 (DELETE /api/reservations/:id)
router.delete('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ message: '예약을 찾을 수 없음' });

    res.status(200).json({ message: '예약이 취소되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error });
  }
});

module.exports = router;
