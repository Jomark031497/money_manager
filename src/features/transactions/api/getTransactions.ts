import { ITransactionWithWallet } from '@/features/transactions';

export const getTransactions = async (id: string): Promise<{ data: ITransactionWithWallet[]; count: number }> => {
  const response = await fetch(`/api/transactions/user/${id}?skip=0&take=5`, {
    method: 'GET',
  });

  const data = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(data));

  return data;
};
