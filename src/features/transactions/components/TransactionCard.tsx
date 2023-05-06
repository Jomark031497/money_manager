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
        'grid grid-cols-4 gap-0 rounded-xl p-2 shadow-md transition-all',
        transaction.type === 'EXPENSE'
          ? 'bg-red-100 text-red-700 hover:bg-red-200'
          : 'bg-green-100 text-green-600 hover:bg-green-200',
      )}
    >
      <p className="col-span-2 text-xs font-semibold">{transaction.name}</p>
      <p className="col-span-2 justify-self-end text-xs">
        {transaction.type === 'EXPENSE' ? '-' : '+'} {toCurrency(transaction.amount)}
      </p>
      <div className="col-span-2 flex items-center gap-1 text-xs">
        <span className="text-xs">{transaction.wallet.emoji}</span>
        <p>{transaction.wallet.name}</p>
      </div>
      <p className="col-span-2 justify-self-end text-xs">
        {format(new Date(transaction.purchaseDate), 'MMMM dd, yyyy')}
      </p>
      <p className="col-span-2 truncate text-xs italic text-gray-500">{transaction.description}</p>
      <p className="col-span-2 justify-self-end text-xs">
        {transaction.category.emoji} {transaction.category.name}
      </p>
    </Link>
  );
};
