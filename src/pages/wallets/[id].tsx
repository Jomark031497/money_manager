import { Button, DropdownMenu, Pagination } from '@/components/Elements';
import {
  CreateTransaction,
  TransactionSkeletonContainer,
  Transactions,
  useTransactions,
} from '@/features/transactions';
import {
  DeleteWallet,
  UpdateWallet,
  WalletCard,
  WalletCardSkeletonContainer,
  WalletSummary,
  useWallet,
  useWalletsSummary,
} from '@/features/wallets';
import { useModal } from '@/hooks/useModal';
import { usePagination } from '@/hooks/usePagination';
import { getServerAuthSession } from '@/server/auth';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Menu } from '@headlessui/react';
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AiFillDelete, AiFillEdit, AiFillSetting, AiOutlinePlus } from 'react-icons/ai';

export default function Wallet({ user }: { user: Session['user'] }) {
  const router = useRouter();
  const id = router.query.id as string;
  const [parent] = useAutoAnimate();

  const { pagination, setPagination } = usePagination({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data: wallet, isLoading, isError } = useWallet(id);
  const { data: transactions } = useTransactions({
    id: user.id,
    options: {
      filterColumn: 'walletId',
      filterValue: wallet?.id,
      skip: pagination.pageIndex,
      take: pagination.pageSize,
    },
  });

  const { data: summary } = useWalletsSummary({ userId: user.id, query: { walletId: id } });

  const { open: openUpdate, isOpen: isUpdateOpen, close: closeUpdate } = useModal();
  const { open: openDelete, isOpen: isDeleteOpen, close: closeDelete } = useModal();
  const { open: openCreateTransaction, isOpen: isCreateTransactionOpen, close: closeCreateTransaction } = useModal();

  if (isError) return <div>Error loading wallet</div>;

  return (
    <>
      <Head>
        <title>{wallet?.name} | Momney Manager App</title>
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

      <div className="mx-auto flex max-w-md flex-col gap-5 p-4">
        <section ref={parent} className="mt-2 rounded border bg-gray-50 p-2 shadow">
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
            <WalletCardSkeletonContainer />
          ) : (
            <>
              <WalletCard wallet={wallet} />
              <UpdateWallet wallet={wallet} close={closeUpdate} isOpen={isUpdateOpen} />
              <DeleteWallet wallet={wallet} close={closeDelete} isOpen={isDeleteOpen} />
            </>
          )}
        </section>

        <WalletSummary userId={user.id} summary={summary} />

        <section className="mt-2 rounded border bg-gray-50 p-2 shadow">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold text-gray-500">Transactions</p>
            <Button onClick={() => openCreateTransaction()} className="flex items-center gap-1">
              <AiOutlinePlus className="text-xl" />
              Create Transaction
            </Button>
          </div>

          <div ref={parent} className="flex flex-col gap-2">
            {transactions ? (
              <Transactions transactions={transactions.data} />
            ) : (
              <TransactionSkeletonContainer count={2} />
            )}
            {transactions?.count ? (
              <Pagination count={transactions.count} pagination={pagination} setPagination={setPagination} />
            ) : null}
          </div>

          <CreateTransaction isOpen={isCreateTransactionOpen} close={closeCreateTransaction} userId={user.id} />
        </section>
      </div>
    </>
  );
}

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
