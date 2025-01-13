import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { styled } from '@stitches/react';

// Styled components using Stitches
const StyledButton = styled('button', {
  all: 'unset', // Reset all default button styles
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px', // Rounded-md
  fontSize: '0.875rem', // Text-sm
  fontWeight: 500, // Font-medium
  padding: '0.5rem 1rem', // px-4 py-2
  cursor: 'pointer',
  transition: 'background-color 0.2s, color 0.2s',

  variants: {
    variant: {
      default: {
        backgroundColor: '#2563eb', // Blue-600
        color: '#fff', // White text
        '&:hover': { backgroundColor: '#1d4ed8' }, // Blue-700
      },
      outline: {
        border: '1px solid #d1d5db', // Gray-300
        color: '#374151', // Gray-700
        '&:hover': { backgroundColor: '#f3f4f6' }, // Gray-100
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#374151', // Gray-700
        '&:hover': { backgroundColor: '#f3f4f6' }, // Gray-100
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export function Button({ variant = 'default', children, asChild = false, ...props }) {
  const Component = asChild ? Slot : 'button'; // Use Slot for custom elements (e.g., <Link>)
  return (
    <StyledButton as={Component} variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}
