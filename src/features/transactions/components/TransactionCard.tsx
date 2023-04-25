import { ITransactionWithWallet } from '@/features/transactions';
import { classNames } from '@/utils/classNames';
import { toCurrency } from '@/utils/toCurrency';
import { format } from 'date-fns';
import Link from 'next/link';

interface Props {
  transaction: ITransactionWithWallet;
}

export const TransactionCard = ({ transaction }: Props) => {
  return (
    <Link
      href={`/transactions/${transaction.id}`}
      className={classNames(
        'grid h-[84px]  grid-cols-3 gap-0 rounded-xl p-2 shadow',
        transaction.type === 'EXPENSE' ? 'bg-red-200 text-red-800' : 'bg-green-100 text-green-600',
      )}
    >
      <p className="col-span-2 text-sm font-semibold">{transaction.name}</p>
      <p className="col-span-1 justify-self-end text-sm font-semibold">
        {transaction.type === 'EXPENSE' ? '-' : '+'} {toCurrency(transaction.amount)}
      </p>
      <p className="col-span-2 text-xs">{transaction.wallet.name}</p>
      <p className="col-span-1 justify-self-end text-xs">{format(new Date(transaction.date), 'MMMM dd, yyyy')}</p>
      <p className="col-span-3 text-xs">{transaction.category.replaceAll('_', ' ')}</p>
      <p className="col-span-3 text-xs italic text-gray-400">{transaction.description}</p>
    </Link>
  );
};
