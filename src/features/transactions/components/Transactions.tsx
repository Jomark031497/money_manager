import { Button } from '@/components/Elements';
import { CreateTransaction, TransactionCard, useTransactions } from '@/features/transactions';
import { useModal } from '@/hooks/useModal';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { AiOutlinePlus } from 'react-icons/ai';

export const Transactions = () => {
  const { data: sessionData } = useSession();

  const { data: transactions, isLoading: isTransactionsLoading } = useTransactions(sessionData?.user.id);
  const { open: openCreateTransaction, isOpen: isCreateTransactionOpen, close: closeCreateTransaction } = useModal();

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-500">Recent Transactions</p>
        <Button
          onClick={() => {
            // if (!wallets?.count) return toast.error('You have no wallets. Please add a wallet first.');
            openCreateTransaction();
          }}
          className="flex items-center gap-1"
        >
          <AiOutlinePlus className="text-2xl" />
          Create Transaction
        </Button>
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-gray-100 p-4">
        {isTransactionsLoading ? (
          <div>Loading...</div>
        ) : transactions?.data.length ? (
          transactions?.data.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TransactionCard transaction={transaction} />
            </motion.div>
          ))
        ) : (
          <div className="text-center">
            <p className="text-md text-gray-500">You have no transaction yet.</p>
          </div>
        )}
      </div>

      <CreateTransaction isOpen={isCreateTransactionOpen} close={closeCreateTransaction} />
    </>
  );
};
