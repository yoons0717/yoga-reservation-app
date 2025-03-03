const express = require('express');
const User = require('../models/User');

const router = express.Router();

// ✅ 1. 사용자(User) 등록 (POST /api/users)
router.post('/', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: '이름과 이메일은 필수 입력값입니다.' });
    }

    const newUser = new User({
      name,
      email,
      role: role || 'student', // 기본값: 일반 사용자(student)
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: '사용자 추가 실패', error });
  }
});

// ✅ 2. 모든 사용자 조회 (GET /api/users)
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // 모든 사용자 조회
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error });
  }
});

module.exports = router;
