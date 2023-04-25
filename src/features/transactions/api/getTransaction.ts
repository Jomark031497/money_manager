import { ITransactionWithWallet } from '@/features/transactions';

export const getTransaction = async (id: string): Promise<ITransactionWithWallet> => {
  const response = await fetch(`/api/transactions/${id}`, {
    method: 'GET',
  });

  const data = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(data));

  return data;
};
