// installment-table.js
import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export function InstallmentTable({ installments, onDonationChange, totalDonation, remainingAmount }) {
  const [selectedDate, setSelectedDate] = useState(undefined);

  return (
    <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th>#</th>
          <th>Installment</th>
          <th>Payment Link</th>
          <th>Due Date</th>
          <th>Total</th>
          <th>Donation</th>
        </tr>
      </thead>
      <tbody>
        {installments.map((installment) => (
          <tr key={installment.id}>
            <td>{installment.id}</td>
            <td>{installment.id === 0 ? 'Down Payment' : `Installment ${installment.id}`}</td>
            <td>{installment.paymentLink || '-'}</td>
            <td>{installment.dueDate}</td>
            <td>₹{installment.total.toFixed(2)}</td>
            <td>
              <Input
                type="number"
                value={installment.donation}
                onChange={(e) => onDonationChange(installment.id, Number(e.target.value))}
              />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="4">Total</td>
          <td>₹{installments.reduce((sum, inst) => sum + inst.total, 0).toFixed(2)}</td>
          <td>
            ₹{totalDonation.toFixed(2)}
            <div className="text-xs text-gray-500">Remaining ₹{remainingAmount.toFixed(2)}</div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}