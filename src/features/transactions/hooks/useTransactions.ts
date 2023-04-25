import { getTransactions } from '@/features/transactions';
import { useQuery } from '@tanstack/react-query';

export const useTransactions = (id?: string) => {
  return useQuery({
    queryKey: ['transactions', id],
    queryFn: async () => (id ? getTransactions(id) : null),
    enabled: !!id,
  });
};
