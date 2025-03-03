const express = require('express'); // Express 웹 서버 라이브러리
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose'); // MongoDB 연결 라이브러리
const classRoutes = require('./routes/classRoutes');
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

dotenv.config(); // .env 파일에서 환경 변수 불러오기

const app = express();
app.use(express.json());

const allowedOrigins = ['http://localhost:5173']; // 프론트엔드 URL 설정 (CORS 허용)
app.use(cors({ origin: allowedOrigins, credentials: true }));

// ✅ MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001; // 서버 포트 설정 (기본값: 5001)

app.use('/api/classes', classRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);

app.get('/', (req, res) => {
  res.send('Hello Yoga Flow Backend!');
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
