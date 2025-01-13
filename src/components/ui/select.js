import React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons'; // Optional: Use any icon

export function Select({ value, onValueChange, children }) {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      {children}
    </RadixSelect.Root>
  );
}

export function SelectTrigger({ children, ...props }) {
  return (
    <RadixSelect.Trigger
      className="flex items-center justify-between p-2 border rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      {...props}
    >
      {children}
      <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500" />
    </RadixSelect.Trigger>
  );
}

export function SelectValue({ placeholder }) {
  return (
    <RadixSelect.Value
      placeholder={placeholder}
      className="text-sm text-gray-700"
    />
  );
}

export function SelectContent({ children }) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content className="absolute mt-1 border rounded-md bg-white shadow-lg z-50">
        <RadixSelect.Viewport className="p-1">{children}</RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  );
}

export function SelectItem({ value, children }) {
  return (
    <RadixSelect.Item
      value={value}
      className="p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded-md focus:outline-none focus:bg-blue-100"
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
}
