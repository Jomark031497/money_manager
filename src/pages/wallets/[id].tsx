import { Button, DropdownMenu } from '@/components/Elements';
import { CreateTransaction, TransactionCard, TransactionCardSkeleton, useTransactions } from '@/features/transactions';
import { DeleteWallet, UpdateWallet, WalletCard, WalletCardSkeleton, useWallet } from '@/features/wallets';
import { useModal } from '@/hooks/useModal';
import { getServerAuthSession } from '@/server/auth';
import { Menu } from '@headlessui/react';
import { motion } from 'framer-motion';
import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AiFillDelete, AiFillEdit, AiFillSetting, AiOutlinePlus } from 'react-icons/ai';

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
export default function Wallet() {
  const { data: sessionData } = useSession();

  const router = useRouter();
  const id = router.query.id as string;

  const { data: wallet, isLoading, isError } = useWallet(id);
  const { data: transactions, isLoading: isTransactionsLoading } = useTransactions({
    id: sessionData?.user.id,
    options: {
      filterColumn: 'walletId',
      filterValue: wallet?.id,
    },
  });

  const { open: openUpdate, isOpen: isUpdateOpen, close: closeUpdate } = useModal();
  const { open: openDelete, isOpen: isDeleteOpen, close: closeDelete } = useModal();
  const { open: openCreateTransaction, isOpen: isCreateTransactionOpen, close: closeCreateTransaction } = useModal();

  if (isError) return <div>Error loading wallet</div>;

  return (
    <>
      <Head>
        <title>Wallet | Momney</title>
      </Head>

      <div className="mx-auto max-w-xl p-4">
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold text-gray-500">Wallet Details</p>

            <DropdownMenu
              label={
                <>
                  <AiFillSetting className="text-xl" />
                  Manage Wallet
                </>
              }
            >
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={openUpdate}
                    className={`${
                      active ? 'bg-secondary text-white' : 'text-gray-500'
                    } flex w-full items-center gap-1 rounded-md p-2 text-sm transition-all`}
                  >
                    <AiFillEdit className="text-lg" />
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={openDelete}
                    className={`${
                      active ? 'bg-red-500 text-white' : ''
                    } flex w-full items-center gap-1 rounded-md px-2 py-2 text-sm text-red-500 transition-all`}
                  >
                    <AiFillDelete className="text-lg" />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </DropdownMenu>
          </div>

          {isLoading ? (
            <WalletCardSkeleton />
          ) : (
            <>
              <WalletCard wallet={wallet} />
              <UpdateWallet wallet={wallet} close={closeUpdate} isOpen={isUpdateOpen} />
              <DeleteWallet wallet={wallet} close={closeDelete} isOpen={isDeleteOpen} />
            </>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold text-gray-500">Transactions</p>
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
              <p className="text-md text-center font-semibold text-gray-500">
                You have no transactions in this wallet.
              </p>
            )}
          </div>

          <CreateTransaction isOpen={isCreateTransactionOpen} close={closeCreateTransaction} />
        </section>
      </div>
    </>
  );
}
