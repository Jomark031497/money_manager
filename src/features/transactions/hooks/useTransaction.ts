import { getTransaction } from '@/features/transactions';
import { useQuery } from '@tanstack/react-query';

export const useTransaction = (id: string) => {
  return useQuery(['transactions', id], async () => getTransaction(id), {
    enabled: !!id,
  });
};
