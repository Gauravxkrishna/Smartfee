// Input.js
import React from 'react';
import { styled } from '@stitches/react';
import { Slot } from '@radix-ui/react-slot';

// Styled input using Stitches
const StyledInput = styled('input', {
  width: '100%',
  padding: '0.5rem 0.75rem',
  border: '1px solid #d1d5db', // Gray-300
  borderRadius: '4px',
  fontSize: '1rem',
  outline: 'none',
  '&:focus': {
    borderColor: '#3b82f6', // Blue-500
    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)', // Blue with transparency
  },
});

export function Input({ type = 'text', value, onChange, ...props }) {
  return (
    <Slot>
      <StyledInput type={type} value={value} onChange={onChange} {...props} />
    </Slot>
  );
}
