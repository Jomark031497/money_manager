import { Transaction } from '@prisma/client';

export const getTransactions = async (
  id: string,
): Promise<{ data: Transaction[]; count: number }> => {
  const response = await fetch(`/api/transactions/user/${id}`, {
    method: 'GET',
  });

  const data = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(data));

  return data;
};
