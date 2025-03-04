import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm text-gray-600 mb-1">{label}</label>}
      <input
        className={`w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-brandBlue ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
