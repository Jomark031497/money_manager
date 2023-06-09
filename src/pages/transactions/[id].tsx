import { DropdownMenu } from '@/components/Elements';
import { DeleteTransaction, TransactionCardSkeleton, UpdateTransaction, useTransaction } from '@/features/transactions';
import { useModal } from '@/hooks/useModal';
import { getServerAuthSession } from '@/server/auth';
import { classNames } from '@/utils/classNames';
import { toCurrency } from '@/utils/toCurrency';
import { Menu } from '@headlessui/react';
import { format } from 'date-fns';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AiFillSetting, AiFillEdit, AiFillDelete } from 'react-icons/ai';

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

export default function Transaction() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: transaction, isLoading, isError } = useTransaction(id);
  const { open: openUpdate, isOpen: isUpdateOpen, close: closeUpdate } = useModal();
  const { open: openDelete, isOpen: isDeleteOpen, close: closeDelete } = useModal();

  if (isError) return <div>Error loading wallet</div>;

  return (
    <>
      <Head>
        <title>Transaction | Momney</title>
      </Head>

      <>
        <div className="mx-auto max-w-xl p-4">
          <section className="mb-4 flex items-center justify-between">
            <p className="font-semibold text-gray-500">Transaction Details</p>

            <DropdownMenu
              label={
                <>
                  <AiFillSetting className="text-xl" />
                  Manage Transaction
                </>
              }
            >
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={openUpdate}
                    className={`${
                      active ? 'bg-secondary text-white' : 'text-gray-500'
                    } flex w-full items-center gap-1 rounded-md px-2 py-2 text-sm transition-all`}
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
                      active ? 'bg-red-500 text-white' : 'text-gray-500'
                    } flex w-full items-center gap-1 rounded-md px-2 py-2 text-sm text-red-500 transition-all`}
                  >
                    <AiFillDelete className="text-lg" />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </DropdownMenu>
          </section>
          {isLoading ? (
            <div role="status" className="flex flex-col gap-2">
              <TransactionCardSkeleton />
              <TransactionCardSkeleton />
            </div>
          ) : (
            <>
              <div className="rounded-xl shadow">
                <div className="rounded-t-xl bg-gradient-to-tr from-red-600 to-orange-500 p-2 text-white">
                  <p className="mb-1 text-xs font-semibold">Transaction Date</p>
                  <p className="text-sm font-semibold">
                    {format(new Date(transaction.createdAt), 'MMMM dd, yyyy hh:mm aa')}
                  </p>
                </div>

                <div className="p-2">
                  <div className="grid grid-cols-4 gap-16 border-b border-dashed p-2">
                    <p className="col-span-1 text-sm text-gray-500">Name</p>
                    <p className="col-span-3 text-sm font-semibold">{transaction.name}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-16 border-b border-dashed p-2">
                    <p className="col-span-1 text-sm text-gray-500">Description</p>
                    <p className="col-span-3 text-sm">{transaction.description || 'N/A'}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-16 border-b border-dashed p-2">
                    <p className="col-span-1 text-sm text-gray-500">Amount</p>
                    <p
                      className={classNames(
                        'col-span-3 text-sm',
                        transaction.type === 'EXPENSE' ? 'text-red-500' : 'text-green-500',
                      )}
                    >
                      {toCurrency(transaction.amount)}
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-16 border-b border-dashed p-2">
                    <p className="col-span-1 text-sm text-gray-500">Wallet</p>
                    <p className="col-span-3 text-sm">{transaction.wallet.name}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-16 p-2">
                    <p className="col-span-1 text-sm text-gray-500">Category</p>
                    <p className="col-span-3 text-sm">{transaction.category.replaceAll('_', ' ')}</p>
                  </div>
                </div>
              </div>
              <UpdateTransaction isOpen={isUpdateOpen} close={closeUpdate} transaction={transaction} />
              <DeleteTransaction isOpen={isDeleteOpen} close={closeDelete} transaction={transaction} />
            </>
          )}
        </div>
      </>
    </>
  );
}
