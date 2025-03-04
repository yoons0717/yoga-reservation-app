const express = require('express');
const Class = require('../models/Class');
const { authenticate, checkRole } = require('../middlewares/auth');

const router = express.Router();

// 모든 라우트에 대해 인증 및 강사 권한 체크 적용
router.use(authenticate);
router.use(checkRole('instructor'));

// 강사가 수업 등록 (자동으로 로그인한 강사의 ID를 사용)
router.post('/', async (req, res) => {
  try {
    const classData = { ...req.body, instructor: req.user.userId };
    const newClass = new Class(classData);
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: 'Error creating class', error });
  }
});

// 강사가 자신이 등록한 수업 수정
router.put('/:id', async (req, res) => {
  try {
    const updatedClass = await Class.findOneAndUpdate(
      { _id: req.params.id, instructor: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updatedClass) return res.status(404).json({ message: 'Class not found' });
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// 강사가 자신이 등록한 수업 삭제
router.delete('/:id', async (req, res) => {
  try {
    const deletedClass = await Class.findOneAndDelete({
      _id: req.params.id,
      instructor: req.user.userId,
    });
    if (!deletedClass) return res.status(404).json({ message: 'Class not found' });
    res.status(200).json({ message: 'Class deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// 강사가 자신이 등록한 수업 목록 조회
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find({ instructor: req.user.userId });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
