import { getWallets } from '@/features/wallets';
import { useQuery } from '@tanstack/react-query';

export const useWallets = (id?: string) => {
  return useQuery({ queryKey: ['wallets', id], queryFn: async () => (id ? getWallets(id) : null), enabled: !!id });
};
