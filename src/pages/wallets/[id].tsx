import { Button, DropdownMenu } from '@/components/Elements';
import { CreateTransaction, TransactionCard, TransactionCardSkeleton, useTransactions } from '@/features/transactions';
import { DeleteWallet, UpdateWallet, WalletCard, WalletCardSkeleton, useWallet } from '@/features/wallets';
import { useModal } from '@/hooks/useModal';
import { getServerAuthSession } from '@/server/auth';
import { Menu } from '@headlessui/react';
import { motion } from 'framer-motion';
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiFillDelete, AiFillEdit, AiFillSetting, AiOutlinePlus } from 'react-icons/ai';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

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
export default function Wallet({ user }: { user: Session['user'] }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const router = useRouter();
  const id = router.query.id as string;

  const { data: wallet, isLoading, isError } = useWallet(id);
  const { data: transactions, isLoading: isTransactionsLoading } = useTransactions({
    id: user.id,
    options: {
      filterColumn: 'walletId',
      filterValue: wallet?.id,
      skip: pagination.pageIndex,
      take: pagination.pageSize,
    },
  });

  const { open: openUpdate, isOpen: isUpdateOpen, close: closeUpdate } = useModal();
  const { open: openDelete, isOpen: isDeleteOpen, close: closeDelete } = useModal();
  const { open: openCreateTransaction, isOpen: isCreateTransactionOpen, close: closeCreateTransaction } = useModal();

  if (isError) return <div>Error loading wallet</div>;

  return (
    <>
      <Head>
        <title>{wallet?.name ?? 'Wallet'} | Momney Manager App</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/wallets/${id}`} key="canonical" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Momney - The Ultimate Money Manager App" />
        <meta
          name="description"
          content="Momney is a powerful money manager app that allows you to easily track your expenses, savings, and transactions. With Momney, you can manage your finances, set budgets, and achieve your financial goals with ease. Try Momney today and simplify your financial life."
        />
        <meta
          property="og:description"
          content="Momney is a powerful money manager app that allows you to easily track your expenses, savings, and transactions. With Momney, you can manage your finances, set budgets, and achieve your financial goals with ease. Try Momney today and simplify your financial life."
        />
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
                  pagination.pageIndex ===
                  Math.ceil(transactions?.count ? transactions.count / pagination.pageSize : 0) - 1
                }
                onClick={() => setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 })}
              >
                <GrFormNext />
              </Button>
            </div>
          </div>

          <CreateTransaction isOpen={isCreateTransactionOpen} close={closeCreateTransaction} userId={user.id} />
        </section>
      </div>
    </>
  );
}
