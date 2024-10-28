import React from 'react';

export function Button({ children, className = '', variant = 'solid', size = 'md', ...props }) {
  const baseStyles = 'px-4 py-2 rounded font-semibold flex items-center justify-center';
  const variants = {
    solid: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-200',
    link: 'bg-transparent text-blue-600 underline hover:text-blue-800'
  };
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    icon: 'p-2'
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
