const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const classRoutes = require('./routes/classRoutes');
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// CORS 설정
const allowedOrigins = ['http://localhost:5173'];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// ✅ Google OAuth 로그인 API
app.post('/api/auth/google', async (req, res) => {
  try {
    const { token } = req.body;

    // Google 토큰 검증
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userId = payload?.sub; // Google User ID
    const name = payload?.name;
    const email = payload?.email;

    if (!userId || !email) {
      return res.status(400).json({ message: '유효하지 않은 사용자 정보입니다.' });
    }

    // JWT 발급
    const jwtToken = jwt.sign({ userId, name, email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token: jwtToken, user: { userId, name, email } });
  } catch (error) {
    res.status(401).json({ message: '인증 실패', error: error.message });
  }
});

// API 라우트 설정
app.use('/api/classes', classRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);

app.get('/', (req, res) => {
  res.send('Hello Yoga Flow Backend!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
