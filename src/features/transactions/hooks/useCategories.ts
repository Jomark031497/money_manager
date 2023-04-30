import { getCategories } from '@/features/transactions';
import { useQuery } from '@tanstack/react-query';

interface Props {
  options?: {
    filterColumn?: string;
    filterValue?: string;
    skip?: number;
    take?: number;
  };
}

export const useCategories = ({ options }: Props) => {
  return useQuery({
    queryKey: ['categories', options?.filterColumn, options?.filterValue],
    queryFn: async () => getCategories({ options }),
  });
};
