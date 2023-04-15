import { getWallets } from '@/features/wallets';
import { useQuery } from '@tanstack/react-query';

export const useWallets = (id?: string) => {
  return useQuery(
    ['wallets'],
    async () => {
      if (!id) return;
      return await getWallets(id);
    },
    {
      enabled: !!id,
    },
  );
};
