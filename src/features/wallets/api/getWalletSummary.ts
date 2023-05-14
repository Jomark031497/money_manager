import { IWalletInputs } from '@/features/wallets';

interface Props {
  userId: string;
  query?: IWalletInputs['query'];
}

export const getWalletSummary = async ({ userId, query }: Props) => {
  const url = new URL(`/api/wallets/summary/${userId}`, process.env.NEXT_PUBLIC_BASE_URL);

  query?.walletId && url.searchParams.set('walletId', query.walletId);
  query?.dateRange && url.searchParams.set('dateRange', query.dateRange);

  const res = await fetch(url, {
    method: 'GET',
  });

  const data = await res.json();

  return data as { totalBalance: number; totalExpenses: number; totalIncome: number };
};
