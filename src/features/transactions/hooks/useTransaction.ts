import { getTransaction } from '@/features/transactions';
import { useQuery } from '@tanstack/react-query';

export const useTransaction = (id: string) => {
  return useQuery({ queryKey: ['transaction', id], queryFn: async () => getTransaction(id), enabled: !!id });
};
