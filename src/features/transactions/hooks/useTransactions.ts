import { getTransactions } from '@/features/transactions';
import { useQuery } from '@tanstack/react-query';

interface Props {
  id: string;
  options?: {
    filterColumn?: string;
    filterValue?: string;
    skip?: number;
    take?: number;
  };
}

export const useTransactions = ({ id, options }: Props) => {
  return useQuery({
    queryKey: ['transactions', id, options?.filterColumn, options?.filterValue, options?.skip, options?.take],
    queryFn: async () => getTransactions({ id, options }),
  });
};
