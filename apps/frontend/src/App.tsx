import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import 'tailwindcss/tailwind.css';

const API_BASE_URL = 'http://localhost:5001/api';

interface Class {
  _id: string;
  title: string;
  instructor?: { name: string };
  startTime: string;
  endTime: string;
  maxParticipants: number;
}

interface Reservation {
  _id: string;
  classId: Class;
  studentId: string;
}

const Home: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    axios.get<Class[]>(`${API_BASE_URL}/classes`).then((res) => setClasses(res.data));
  }, []);

  const handleReservation = async (classId: string) => {
    try {
      const studentId = '65d0c9f7e4b0a12d3456789b'; // 테스트용 사용자 ID
      await axios.post(`${API_BASE_URL}/reservations`, { classId, studentId });
      alert('예약이 완료되었습니다!');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      alert('예약 실패: ' + (axiosError.response?.data?.message || '알 수 없는 오류'));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">요가 수업 목록</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {classes.map((cls) => (
          <div key={cls._id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{cls.title}</h2>
            <p>강사: {cls.instructor?.name || '정보 없음'}</p>
            <p>
              시간: {cls.startTime} - {cls.endTime}
            </p>
            <p>최대 인원: {cls.maxParticipants}명</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => handleReservation(cls._id)}
            >
              예약하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    axios
      .get<Reservation[]>(`${API_BASE_URL}/reservations`)
      .then((res) => setReservations(res.data));
  }, []);

  const handleCancel = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/reservations/${id}`);
      alert('예약이 취소되었습니다!');
      setReservations(reservations.filter((res) => res._id !== id));
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      alert('취소 실패: ' + (axiosError.response?.data?.message || '알 수 없는 오류'));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">내 예약 목록</h1>
      <div className="grid grid-cols-1 gap-4">
        {reservations.map((res) => (
          <div key={res._id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{res.classId.title}</h2>
            <p>강사: {res.classId.instructor?.name || '정보 없음'}</p>
            <p>
              시간: {res.classId.startTime} - {res.classId.endTime}
            </p>
            <button
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={() => handleCancel(res._id)}
            >
              취소하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
        <nav className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-around">
          <Link to="/" className="px-4 py-2">
            홈
          </Link>
          <Link to="/reservations" className="px-4 py-2">
            예약 목록
          </Link>
        </nav>
      </div>
    </Router>
  );
};

export default App;
