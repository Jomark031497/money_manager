import { ITransactionInputs } from '@/features/transactions';
import { Transaction } from '@prisma/client';

export const updateTransaction = async (id: string, payload: ITransactionInputs['body']): Promise<Transaction> => {
  const response = await fetch(`/api/transactions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application',
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(data));

  return data;
};
