import { Wallet } from '@prisma/client';

export const getWallets = async (id: string): Promise<{ data: Wallet[]; count: number }> => {
  const response = await fetch(`/api/wallets/user/${id}`, {
    method: 'GET',
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
};
