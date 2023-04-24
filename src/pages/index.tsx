import { CreateWallet, WalletCard, useWallets } from '@/features/wallets';
import { motion } from 'framer-motion';
import { GetServerSidePropsContext } from 'next';
import { AiOutlinePlus } from 'react-icons/ai';
import Head from 'next/head';
import { Button } from '@/components/Elements';
import { useModal } from '@/hooks/useModal';
import { CreateTransaction, TransactionCard, useTransactions } from '@/features/transactions';
import { Session } from 'next-auth';
import { toast } from 'react-toastify';
import { getServerAuthSession } from '@/server/auth';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default function Home({ user }: { user: Session['user'] }) {
  const { data: wallets, isLoading: isWalletsLoading } = useWallets(user.id);
  const { data: transactions, isLoading: isTransactionsLoading } = useTransactions(user.id);

  const { open: openCreateWallet, isOpen: isCreateWalletOpen, close: closeCreateWallet } = useModal();

  const { open: openCreateTransaction, isOpen: isCreateTransactionOpen, close: closeCreateTransaction } = useModal();

  return (
    <>
      <Head>
        <title>Dashboard | Momney</title>
      </Head>

      <div className="mx-auto flex max-w-xl flex-col gap-12 p-4">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-500">Wallets</p>
            <Button onClick={() => openCreateWallet()} className="flex items-center gap-1">
              <AiOutlinePlus className="text-2xl" />
              Add Wallet
            </Button>
          </div>

          <div className="flex flex-col gap-2 rounded-xl bg-gray-100 px-4 py-2">
            {isWalletsLoading ? (
              <div>Loading...</div>
            ) : wallets?.data.length ? (
              wallets?.data.map((wallet, index) => (
                <motion.div
                  key={wallet.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <WalletCard wallet={wallet} />
                </motion.div>
              ))
            ) : (
              <div className="text-center">
                <p className="text-md text-gray-500">You have no wallets yet.</p>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-500">Recent Transactions</p>
            <Button
              onClick={() => {
                if (!wallets?.count) return toast.error('You have no wallets. Please add a wallet first.');
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
        </section>
      </div>

      <CreateWallet isOpen={isCreateWalletOpen} close={closeCreateWallet} />
      <CreateTransaction isOpen={isCreateTransactionOpen} close={closeCreateTransaction} />
    </>
  );
}
