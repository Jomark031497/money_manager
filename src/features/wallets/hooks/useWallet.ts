import { getOneWallet } from '@/features/wallets';
import { useQuery } from '@tanstack/react-query';

export const useWallet = (id: string) => {
  return useQuery({ queryKey: ['wallet', id], queryFn: async () => getOneWallet(id), enabled: !!id });
};
