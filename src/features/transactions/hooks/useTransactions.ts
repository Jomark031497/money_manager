import { getTransactions } from '@/features/transactions';
import { useQuery } from '@tanstack/react-query';

export const useTransactions = (id: string) => {
  return useQuery(['transactions', id], async () => getTransactions(id), {
    enabled: !!id,
  });
};
