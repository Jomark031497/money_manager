import { IWalletInputs, getWalletSummary } from '@/features/wallets';
import { useQuery } from '@tanstack/react-query';

interface Props {
  userId: string;
  query?: IWalletInputs['query'];
}
export const useWalletsSummary = ({ userId, query }: Props) => {
  return useQuery(
    ['walletsSummary', userId, query?.walletId, query?.dateRange],
    async () => getWalletSummary({ userId, query }),
    {
      keepPreviousData: true,
    },
  );
};
