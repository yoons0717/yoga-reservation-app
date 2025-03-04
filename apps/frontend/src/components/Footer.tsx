import React from 'react';
import { MdHome, MdListAlt, MdPerson } from 'react-icons/md';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white h-16 flex items-center justify-around shadow-inner">
      <button className="flex flex-col items-center text-xs text-gray-500">
        <MdHome className="w-5 h-5 mb-1" />
        수강권
      </button>
      <button className="flex flex-col items-center text-xs text-gray-500">
        <MdListAlt className="w-5 h-5 mb-1" />내 예약
      </button>
      <button className="flex flex-col items-center text-xs text-gray-500">
        <MdPerson className="w-5 h-5 mb-1" />
        마이페이지
      </button>
    </footer>
  );
};

export default Footer;
