/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'Spoqa Han Sans', 'Noto Sans KR', 'sans-serif'],
      },
      colors: {
        bgLight: '#F8F9FD', // 밝은 배경
        brandBlue: '#4A90E2', // 포인트 블루
        textDark: '#333333', // 진한 텍스트
        textGray: '#666666', // 중간 텍스트
      },
    },
  },
  plugins: [],
};
