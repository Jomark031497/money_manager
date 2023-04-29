import { Button } from '@/components/Elements';
import { CreateTransaction, TransactionCard, TransactionCardSkeleton, useTransactions } from '@/features/transactions';
import { useModal } from '@/hooks/useModal';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { AiOutlinePlus } from 'react-icons/ai';

export const Transactions = () => {
  const { data: sessionData } = useSession();

  const { data: transactions, isLoading: isTransactionsLoading } = useTransactions({ id: sessionData?.user.id });
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
          </>
        ) : transactions?.data.length ? (
          transactions?.data.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <TransactionCard transaction={transaction} />
            </motion.div>
          ))
        ) : (
          <p className="text-md text-center font-semibold text-gray-500">You have no transactions yet.</p>
        )}
      </div>

      <CreateTransaction isOpen={isCreateTransactionOpen} close={closeCreateTransaction} />
    </>
  );
};
