import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

interface Class {
  _id: string;
  title: string;
  instructor?: { name: string };
  startTime: string;
  endTime: string;
  maxParticipants: number;
}

const Home: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    axios.get<Class[]>(`${API_BASE_URL}/classes`).then((res) => setClasses(res.data));
  }, []);

  const handleReservation = async (classId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('로그인이 필요합니다.');

      await axios.post(
        `${API_BASE_URL}/reservations`,
        { classId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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

export default Home;
