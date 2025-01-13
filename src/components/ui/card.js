import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { styled } from '@stitches/react';

// Styled components using Stitches
const StyledCard = styled('div', {
  borderRadius: '8px',
  border: '1px solid #e5e7eb', // Gray-300
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', // Shadow-sm
  backgroundColor: '#fff', // White background
});

const StyledCardHeader = styled('div', {
  padding: '1rem',
  borderBottom: '1px solid #e5e7eb', // Gray-300
});

const StyledCardTitle = styled('h2', {
  fontSize: '1.125rem', // Text-lg
  fontWeight: '700', // Font-bold
  margin: '0',
});

const StyledCardContent = styled('div', {
  padding: '1rem',
});

const StyledCardFooter = styled('div', {
  padding: '1rem',
  borderTop: '1px solid #e5e7eb', // Gray-300
});

// Radix-based components
export function Card({ children, className }) {
  return (
    <Slot>
      <StyledCard className={className}>{children}</StyledCard>
    </Slot>
  );
}

export function CardHeader({ children }) {
  return (
    <Slot>
      <StyledCardHeader>{children}</StyledCardHeader>
    </Slot>
  );
}

export function CardTitle({ children }) {
  return (
    <Slot>
      <StyledCardTitle>{children}</StyledCardTitle>
    </Slot>
  );
}

export function CardContent({ children }) {
  return (
    <Slot>
      <StyledCardContent>{children}</StyledCardContent>
    </Slot>
  );
}

export function CardFooter({ children }) {
  return (
    <Slot>
      <StyledCardFooter>{children}</StyledCardFooter>
    </Slot>
  );
}
