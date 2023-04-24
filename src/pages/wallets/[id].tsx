import { DropdownMenu } from '@/components/Elements';
import { DeleteWallet, UpdateWallet, WalletCard, useWallet } from '@/features/wallets';
import { useModal } from '@/hooks/useModal';
import { getServerAuthSession } from '@/server/auth';
import { Menu } from '@headlessui/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AiFillDelete, AiFillEdit, AiFillSetting } from 'react-icons/ai';

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
  const router = useRouter();
  const id = router.query.id as string;

  const { data: wallet, isLoading, isError } = useWallet(id);

  const { open: openUpdate, isOpen: isUpdateOpen, close: closeUpdate } = useModal();
  const { open: openDelete, isOpen: isDeleteOpen, close: closeDelete } = useModal();

  if (isError) return <div>Error loading wallet</div>;

  return (
    <>
      <Head>
        <title>Wallet | Momney</title>
      </Head>

      <div className="mx-auto max-w-xl p-4">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold text-gray-500">Wallet Details</p>

            <DropdownMenu
              label={
                <>
                  <AiFillSetting className="text-2xl" />
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
                    } flex w-full items-center gap-1 rounded-md px-2 py-2 text-sm`}
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
                      active ? 'bg-secondary text-white' : 'text-gray-500'
                    } flex w-full items-center gap-1 rounded-md px-2 py-2 text-sm`}
                  >
                    <AiFillDelete className="text-lg" />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </DropdownMenu>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <WalletCard wallet={wallet} />
              <UpdateWallet wallet={wallet} close={closeUpdate} isOpen={isUpdateOpen} />
              <DeleteWallet wallet={wallet} close={closeDelete} isOpen={isDeleteOpen} />
            </>
          )}
        </section>
      </div>
    </>
  );
}
