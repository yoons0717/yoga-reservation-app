const express = require('express');
const User = require('../models/User');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();
// 현재 로그인한 사용자 정보 조회
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
