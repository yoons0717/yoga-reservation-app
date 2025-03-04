const express = require('express');
const User = require('../models/User');
const { authenticate, checkRole } = require('../middlewares/auth');

const router = express.Router();

// 관리자 전용: 센터 계정 등록 (POST /api/admin/centers)
router.post('/', authenticate, checkRole('admin'), async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }
    // 강제로 역할을 "center"로 지정
    const newCenter = new User({ name, phone, role: 'center' });
    await newCenter.save();
    res.status(201).json(newCenter);
  } catch (err) {
    res.status(400).json({ message: 'Center creation failed', error: err.message });
  }
});

// 관리자 전용: 센터 목록 조회 (GET /api/admin/centers)
router.get('/', authenticate, checkRole('admin'), async (req, res) => {
  try {
    const centers = await User.find({ role: 'center' });
    res.status(200).json(centers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 관리자 전용: 특정 센터 조회 (GET /api/admin/centers/:id)
router.get('/:id', authenticate, checkRole('admin'), async (req, res) => {
  try {
    const center = await User.findOne({ _id: req.params.id, role: 'center' });
    if (!center) return res.status(404).json({ message: 'Center not found' });
    res.status(200).json(center);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 관리자 전용: 특정 센터 수정 (PUT /api/admin/centers/:id)
router.put('/:id', authenticate, checkRole('admin'), async (req, res) => {
  try {
    const updatedCenter = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'center' },
      req.body,
      { new: true }
    );
    if (!updatedCenter) return res.status(404).json({ message: 'Center not found' });
    res.status(200).json(updatedCenter);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
});

module.exports = router;
