import { Button } from '@/components/Elements';
import { CreateTransaction, TransactionCard, TransactionCardSkeleton, useTransactions } from '@/features/transactions';
import { useModal } from '@/hooks/useModal';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

interface Props {
  userId: string;
}

export const Transactions = ({ userId }: Props) => {
  const [pagination, setPagination] = useState({
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

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-semibold text-gray-500">Recent Transactions</p>
        <Button onClick={() => openCreateTransaction()} className="flex items-center gap-1">
          <AiOutlinePlus className="text-xl" />
          Create Transaction
        </Button>
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-gray-100 p-2">
        {isTransactionsLoading ? (
          <>
            <TransactionCardSkeleton />
            <TransactionCardSkeleton />
            <TransactionCardSkeleton />
            <TransactionCardSkeleton />
            <TransactionCardSkeleton />
          </>
        ) : transactions?.data.length ? (
          transactions?.data.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <TransactionCard transaction={transaction} />
            </motion.div>
          ))
        ) : (
          <p className="text-md text-center font-semibold text-gray-500">You have no transactions yet.</p>
        )}

        <div className="flex justify-end gap-2">
          <Button
            aria-label="Previous"
            disabled={pagination.pageIndex === 0}
            onClick={() => setPagination({ ...pagination, pageIndex: pagination.pageIndex - 1 })}
          >
            <GrFormPrevious />
          </Button>
          <p>
            {pagination.pageIndex + 1} of{' '}
            {Math.ceil(transactions?.count ? transactions.count / pagination.pageSize : 0)}
          </p>
          <Button
            aria-label="Next"
            disabled={
              pagination.pageIndex === Math.ceil(transactions?.count ? transactions.count / pagination.pageSize : 0) - 1
            }
            onClick={() => setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 })}
          >
            <GrFormNext />
          </Button>
        </div>
      </div>

      <CreateTransaction isOpen={isCreateTransactionOpen} close={closeCreateTransaction} userId={userId} />
    </>
  );
};
