import { getTransactions } from '@/features/transactions';
import { useQuery } from '@tanstack/react-query';

interface Props {
  id?: string;
  options?: {
    filterColumn?: string;
    filterValue?: string;
  };
}

export const useTransactions = ({ id, options }: Props) => {
  return useQuery({
    queryKey: ['transactions', id, options?.filterColumn, options?.filterValue],
    queryFn: async () => (id ? getTransactions({ id, options }) : null),
    enabled: !!id,
  });
};
