export const toCurrency = (amount: number | string) => {
  const val: string | number = typeof amount === 'string' ? parseInt(amount) : amount;

  const formatter = new Intl.NumberFormat('tl-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 2,
  });

  return formatter.format(val);
};
