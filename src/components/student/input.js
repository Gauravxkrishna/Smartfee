import React, { useState } from "react";

// Input Component
export function Input({ className = '', ...props }) {
  return (
    <input
      className={`px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 w-full text-gray-700 ${className}`}
      {...props}
    />
  );
}