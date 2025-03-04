// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const VerificationCode = require('../models/VerificationCode');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const router = express.Router();

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST /api/auth/send-code : 인증번호 전송
router.post('/send-code', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: 'Phone number is required' });
  const code = generateCode();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5분 만료

  await VerificationCode.findOneAndUpdate(
    { phone },
    { code, expiresAt },
    { upsert: true, new: true }
  );

  console.log(`Sending SMS to ${phone}: Your verification code is ${code}`);
  res.json({ message: 'Verification code sent' });
});

// POST /api/auth/verify-code : 인증번호 검증 후 로그인
router.post('/verify-code', async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) return res.status(400).json({ message: 'Phone and code are required' });
  try {
    const record = await VerificationCode.findOne({ phone });
    if (!record) return res.status(400).json({ message: 'No verification code found' });
    if (record.code !== code) return res.status(400).json({ message: 'Invalid verification code' });
    if (record.expiresAt < new Date())
      return res.status(400).json({ message: 'Verification code expired' });

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please contact administrator.' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    await VerificationCode.deleteOne({ phone });

    res.json({
      token,
      user: { userId: user._id, role: user.role, name: user.name, phone: user.phone },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
