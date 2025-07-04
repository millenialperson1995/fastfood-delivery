import React from 'react';

const Button = ({ children, onClick, variant = 'primary', type = 'button', disabled = false, className = '' }) => {
  const baseClasses = 'font-bold py-2 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-yellow-500 text-gray-900 hover:bg-yellow-400',
    success: 'bg-green-600 text-white hover:bg-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-500',
  };

  const variantClasses = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;