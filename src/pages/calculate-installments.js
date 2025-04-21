export function calculateInstallments(
  numberOfInstallments,
  startDate,
  repeatMonths,
  totalAmount
) {
  const installments = [];
  const start = new Date(startDate);
  const installmentAmount = totalAmount / numberOfInstallments;

  for (let i = 0; i < numberOfInstallments; i++) {
      const dueDate = new Date(start);
      dueDate.setMonth(start.getMonth() + i * repeatMonths);

      installments.push({
          id: i,
          dueDate: i === 0 ? new Date().toLocaleDateString() : dueDate.toLocaleDateString(), // Convert to string for rendering
          total: Number(installmentAmount.toFixed(2)),
          donation: Number((installmentAmount * 0.25).toFixed(2)),
      });
  }

  return installments;
}
