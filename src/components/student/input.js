import React from 'react';

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`px-4 py-2 border rounded w-full ${className}`}
      {...props}
    />
  );
}
