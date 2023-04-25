import { ITransactionWithWallet } from '@/features/transactions';

export const getTransactions = async (id: string): Promise<{ data: ITransactionWithWallet[]; count: number }> => {
  const response = await fetch(`/api/txns/user/${id}`, {
    method: 'GET',
  });

  const data = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(data));

  return data;
};
