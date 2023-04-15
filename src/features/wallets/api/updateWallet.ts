import { IUpdateWalletInputs } from '@/features/wallets';
import { Wallet } from '@prisma/client';

export const updateWallet = async (id: string, payload: IUpdateWalletInputs): Promise<Wallet> => {
  const response = await fetch(`/api/wallets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(data));

  return data;
};
