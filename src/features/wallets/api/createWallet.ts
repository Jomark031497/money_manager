import { IWalletInputs } from '@/features/wallets';
import { Wallet } from '@prisma/client';

export const createWallet = async (payload: IWalletInputs['body']): Promise<Wallet> => {
  const response = await fetch('/api/wallets', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error('Wallet creation failed');
  return data;
};
