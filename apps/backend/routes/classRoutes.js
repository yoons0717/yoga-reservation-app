// MongoDB에서 수업 데이터를 CRUD (생성, 조회, 수정, 삭제)

const express = require('express');
const Class = require('../models/Class');

const router = express.Router(); // Express 라우터 생성

// ✅ 1. 모든 수업 목록 조회 (GET /api/classes)
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find().populate('instructor', 'name email'); // 강사 정보 포함
    res.status(200).json(classes); // JSON 응답
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error });
  }
});

// ✅ 2. 새 수업 등록 (POST /api/classes)
router.post('/', async (req, res) => {
  try {
    const newClass = new Class(req.body); // 요청 본문(req.body)에서 새 수업 생성
    await newClass.save(); // MongoDB에 저장
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: '입력값 오류', error });
  }
});

// ✅ 3. 수업 수정 (PUT /api/classes/:id)
router.put('/:id', async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) return res.status(404).json({ message: '수업을 찾을 수 없음' });
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error });
  }
});

// ✅ 4. 수업 삭제 (DELETE /api/classes/:id)
router.delete('/:id', async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) return res.status(404).json({ message: '수업을 찾을 수 없음' });
    res.status(200).json({ message: '수업 삭제 완료' });
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error });
  }
});

module.exports = router; // 라우터 내보내기
