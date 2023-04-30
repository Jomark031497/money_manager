import { Button, Pagination } from '@/components/Elements';
import { CreateTransaction, TransactionCard, TransactionCardSkeleton, useTransactions } from '@/features/transactions';
import { useModal } from '@/hooks/useModal';
import { usePagination } from '@/hooks/usePagination';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { RiExchangeBoxFill } from 'react-icons/ri';

interface Props {
  userId: string;
}

export const Transactions = ({ userId }: Props) => {
  const { pagination, setPagination } = usePagination({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data: transactions, isLoading: isTransactionsLoading } = useTransactions({
    id: userId,
    options: {
      skip: pagination.pageIndex,
      take: pagination.pageSize,
    },
  });
  const { open: openCreateTransaction, isOpen: isCreateTransactionOpen, close: closeCreateTransaction } = useModal();
  const [parent] = useAutoAnimate();

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-semibold text-gray-500">Recent Transactions</p>
        <Button onClick={() => openCreateTransaction()} className="flex items-center gap-1">
          <RiExchangeBoxFill className="text-xl" />
          Create Transaction
        </Button>
      </div>

      <div ref={parent} className="flex flex-col gap-2 rounded-xl bg-gray-100 p-2">
        {isTransactionsLoading ? (
          <>
            <TransactionCardSkeleton />
            <TransactionCardSkeleton />
            <TransactionCardSkeleton />
            <TransactionCardSkeleton />
            <TransactionCardSkeleton />
          </>
        ) : transactions?.data.length ? (
          transactions.data.map((transaction) => <TransactionCard transaction={transaction} key={transaction.id} />)
        ) : (
          <p className="text-md text-center font-semibold text-gray-500">You have no transactions yet.</p>
        )}

        {transactions?.count && (
          <Pagination count={transactions.count} pagination={pagination} setPagination={setPagination} />
        )}
      </div>

      <CreateTransaction isOpen={isCreateTransactionOpen} close={closeCreateTransaction} userId={userId} />
    </>
  );
};
