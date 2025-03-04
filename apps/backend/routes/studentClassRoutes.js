const express = require('express');
const Class = require('../models/Class');
const router = express.Router();

// 학생은 모든 수업 조회 가능 (강사의 정보 포함)
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find().populate('instructor', 'name email');
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
