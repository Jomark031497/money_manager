import { Wallet } from '@prisma/client';

export const getOneWallet = async (id: string): Promise<Wallet> => {
  const response = await fetch(`/api/wallets/${id}`);
  const data = await response.json();

  if (!response.ok) throw new Error('Unable to get Wallet', { cause: data });

  return data;
};
