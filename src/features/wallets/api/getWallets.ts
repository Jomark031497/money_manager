import { Wallet } from '@prisma/client';

export const getWallets = async (id: string) => {
  const response = await fetch(`/api/wallets/user/${id}`, {
    method: 'GET',
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data as { data: Wallet[]; count: number };
};
