import { ITransactionInputs } from '@/features/transactions';
import { Transaction } from '@prisma/client';

export const createTransaction = async (
  payload: ITransactionInputs['body'],
): Promise<Transaction> => {
  const response = await fetch(`/api/transactions`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(data));

  return data;
};
