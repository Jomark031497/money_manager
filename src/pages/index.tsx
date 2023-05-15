import { WalletSummary, Wallets, useWalletsSummary } from '@/features/wallets';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import {
  CreateTransaction,
  TransactionSkeletonContainer,
  Transactions,
  useTransactions,
} from '@/features/transactions';
import { Button, Pagination } from '@/components/Elements';
import { useModal } from '@/hooks/useModal';
import { usePagination } from '@/hooks/usePagination';
import { RiExchangeBoxFill } from 'react-icons/ri';
import { getServerAuthSession } from '@/server/auth';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};

export default function Home({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { pagination, setPagination } = usePagination({ pageIndex: 0, pageSize: 5 });
  const { data: transactions } = useTransactions({
    id: user.id,
    options: { skip: pagination.pageIndex, take: pagination.pageSize },
  });

  const { data: summary } = useWalletsSummary({
    userId: user.id,
    query: {
      dateRange: 'This Year',
    },
  });

  const {
    open: openCreateTransaction,
    isOpen: isCreateTransactionOpen,
    close: closeCreateTransaction,
  } = useModal();

  return (
    <>
      <Head>
        <title>Home | Momney Manager App</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}`} key="canonical" />
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

      <div className="mx-auto flex max-w-md flex-col gap-5 p-4 shadow">
        <Wallets userId={user.id} />

        <WalletSummary userId={user.id} summary={summary} />

        <section>
          <div className="flex flex-col gap-2 rounded-xl border bg-gray-50 p-2 shadow">
            <div className="mb-2 flex items-center justify-between">
              <p className="truncate font-semibold text-gray-500">Recent Transactions</p>
              <Button onClick={() => openCreateTransaction()} className="flex items-center gap-1">
                <RiExchangeBoxFill className="text-xl" />
                Create Transaction
              </Button>
            </div>
            {transactions ? (
              <Transactions transactions={transactions.data} />
            ) : (
              <TransactionSkeletonContainer count={5} />
            )}
            {transactions?.count ? (
              <Pagination
                count={transactions.count}
                pagination={pagination}
                setPagination={setPagination}
              />
            ) : null}
          </div>
        </section>
      </div>
      <CreateTransaction
        isOpen={isCreateTransactionOpen}
        close={closeCreateTransaction}
        userId={user.id}
      />
    </>
  );
}
