import { ITransactionInputs } from '@/features/transactions';
import { Transaction } from '@prisma/client';

export const updateTransaction = async (
  id: string,
  payload: Partial<ITransactionInputs['body']>,
): Promise<Transaction> => {
  const response = await fetch(`/api/transactions/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...payload }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(data));

  return data;
};
