import React from 'react';

export function Dialog({ open, onOpenChange, children }) {
  return (
    open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg max-w-lg w-full">
          {children}
          <button onClick={() => onOpenChange(false)} className="absolute top-2 right-2">
            &times;
          </button>
        </div>
      </div>
    )
  );
}

export function DialogContent({ children, className }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="border-b pb-4 mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}
