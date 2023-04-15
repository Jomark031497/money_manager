import { getWallets } from '@/features/wallets';
import { useQuery } from '@tanstack/react-query';

export const useWallets = (id?: string) => {
  return useQuery(['wallets'], async () => (id ? await getWallets(id) : null), {
    enabled: !!id,
  });
};
