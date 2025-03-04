const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
// 관리자 전용 센터 등록 및 관리 라우트
const adminCenterRoutes = require('./routes/adminCenterRoutes');
// 센터 전용 회원 등록 및 관리 라우트
const centerMemberRoutes = require('./routes/centerMemberRoutes');
const adminRegisterRoutes = require('./routes/adminRegisterRoutes');

// 기존의 강사용/학생용 수업, 예약 라우트 (생략)
// 예: instructorClassRoutes, instructorReservationRoutes, studentClassRoutes, studentReservationRoutes

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = ['http://localhost:5173'];
app.use(cors({ origin: allowedOrigins, credentials: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;

// Public routes: SMS 인증 및 로그인
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin/register', adminRegisterRoutes);

// 관리자 전용: 센터 관리 (등록, 조회, 수정)
app.use('/api/admin/centers', adminCenterRoutes);

// 센터 전용: 회원 관리 (등록, 조회, 수정)
app.use('/api/center/members', centerMemberRoutes);

// 나머지 강사/학생용 수업, 예약 라우트는 이전과 동일하게 추가

app.get('/', (req, res) => {
  res.send('Hello Yoga Flow Backend!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
