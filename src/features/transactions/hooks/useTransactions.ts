import { getTransactions } from '@/features/transactions';
import { useQuery } from '@tanstack/react-query';

export const useTransactions = (id: string) => {
  return useQuery(['walletTransactions', id], async () => getTransactions(id), {
    enabled: !!id,
  });
};
