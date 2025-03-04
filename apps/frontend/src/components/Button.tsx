import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brandBlue hover:bg-blue-500 text-white',
  secondary: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
  tertiary: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const widthClass = fullWidth ? 'w-full' : '';
  return (
    <button
      className={`${widthClass} ${variantClasses[variant]} px-4 py-2 rounded transition-colors text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
