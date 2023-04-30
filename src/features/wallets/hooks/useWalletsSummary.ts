import { useQuery } from '@tanstack/react-query';

export const useWalletsSummary = ({ userId }: { userId: string }) => {
  return useQuery(
    ['walletsSummary'],
    async () => {
      const response = await fetch(`/api/wallets/summary/${userId}`, {
        method: 'GET',
      });

      const data = await response.json();

      return data as { totalBalance: number; totalExpenses: number; totalIncome: number };
    },
    { keepPreviousData: true },
  );
};
