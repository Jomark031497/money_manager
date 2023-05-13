import { ITransactionWithWallet, TransactionCard } from '@/features/transactions';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface Props {
  transactions: ITransactionWithWallet[];
}

export const Transactions = ({ transactions }: Props) => {
  const [parent] = useAutoAnimate();

  return (
    <>
      <div ref={parent} className="flex flex-col gap-2">
        {transactions?.length ? (
          transactions.map((transaction) => <TransactionCard transaction={transaction} key={transaction.id} />)
        ) : (
          <p className="text-md text-center font-semibold text-gray-500">You have no transactions yet.</p>
        )}
      </div>
    </>
  );
};
