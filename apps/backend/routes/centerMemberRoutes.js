const express = require('express');
const User = require('../models/User');
const Pass = require('../models/Pass');
const { authenticate, checkRole } = require('../middlewares/auth');

const router = express.Router();

// 센터 전용: 회원 계정과 수강권 등록 (POST /api/center/members)
router.post('/', authenticate, checkRole('center'), async (req, res) => {
  try {
    const { name, phone, pass } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }

    // 수강권 정보가 반드시 필요하도록 체크
    if (!pass || !pass.type || !pass.passCount || !pass.passStartDate || !pass.passEndDate) {
      return res.status(400).json({
        message: 'Pass information is required (type, passCount, passStartDate, passEndDate)',
      });
    }

    // 회원 계정 생성 (역할은 "member", 센터 정보는 현재 로그인한 센터의 _id)
    const newMember = new User({
      name,
      phone,
      role: 'member',
      center: req.user.userId,
    });
    await newMember.save();

    // 수강권 등록: 센터에서 지정한 수강권 정보를 사용하여 새 회원에게 등록
    const newPass = new Pass({
      userId: newMember._id,
      type: pass.type, // "30일", "60일", "90일" 중 하나
      passCount: pass.passCount,
      usedPasses: 0,
      passStartDate: new Date(pass.passStartDate),
      passEndDate: new Date(pass.passEndDate),
    });
    await newPass.save();

    res.status(201).json({ member: newMember, pass: newPass });
  } catch (err) {
    res.status(400).json({ message: 'Member creation failed', error: err.message });
  }
});

// 센터 전용: 등록된 회원 목록 조회 (회원 정보 + 수강권 정보 포함) (GET /api/center/members)
router.get('/', authenticate, checkRole('center'), async (req, res) => {
  try {
    // 회원 목록 조회
    const members = await User.find({
      role: 'member',
      center: req.user?.userId,
    }).lean();

    // 각 회원마다 수강권 정보 조회 (1:1 관계라고 가정)
    const membersWithPass = await Promise.all(
      members.map(async (member) => {
        const pass = await Pass.findOne({ userId: member._id }).lean();
        return { ...member, pass };
      })
    );

    res.status(200).json(membersWithPass);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 센터 전용: 특정 회원 조회 (GET /api/center/members/:id)
router.get('/:id', authenticate, checkRole('center'), async (req, res) => {
  try {
    const member = await User.findOne({
      _id: req.params.id,
      role: 'member',
      center: req.user.userId,
    });
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 센터 전용: 특정 회원 수정 (PUT /api/center/members/:id)
// (회원 수정 시 수강권 수정은 별도의 API로 구성하거나 함께 업데이트할 수 있습니다.)
router.put('/:id', authenticate, checkRole('center'), async (req, res) => {
  try {
    const updatedMember = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'member', center: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updatedMember) return res.status(404).json({ message: 'Member not found' });
    res.status(200).json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
});

module.exports = router;
