import { ITransactionWithWallet } from '@/features/transactions';

interface Props {
  id: string;
  options?: {
    filterColumn?: string;
    filterValue?: string;
    skip?: number;
    take?: number;
  };
}

export const getTransactions = async ({
  id,
  options,
}: Props): Promise<{ data: ITransactionWithWallet[]; count: number }> => {
  const url = new URL(`/api/txns/user/${id}`, process.env.NEXT_PUBLIC_BASE_URL);

  options?.filterColumn && url.searchParams.set('filterColumn', options.filterColumn);
  options?.filterValue && url.searchParams.set('filterValue', options.filterValue);
  options?.skip && url.searchParams.set('skip', options.skip.toString());
  options?.take && url.searchParams.set('take', options.take.toString());

  const response = await fetch(url, {
    method: 'GET',
  });

  const data = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(data));

  return data;
};
