const express = require('express');
const User = require('../models/User'); // 제대로 된 모델 생성자여야 함

const router = express.Router();

// 초기 설정용 관리자 등록 API
router.post('/', async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }
    // 강제로 역할을 "admin"으로 지정
    const newAdmin = new User({ name, phone, role: 'admin' });
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ message: 'Admin registration failed', error: err.message });
  }
});

module.exports = router;
