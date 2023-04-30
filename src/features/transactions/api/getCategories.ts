import { TransactionCategory } from '@prisma/client';

interface Props {
  options?: {
    filterColumn?: string;
    filterValue?: string;
    skip?: number;
    take?: number;
  };
}

export const getCategories = async ({ options }: Props): Promise<TransactionCategory[]> => {
  const url = new URL(`/api/txns/categories`, process.env.NEXT_PUBLIC_BASE_URL);

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
