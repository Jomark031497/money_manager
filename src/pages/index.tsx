import { CreateWallet, WalletCard, useWallets } from '@/features/wallets';
import { motion } from 'framer-motion';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { AiOutlinePlus } from 'react-icons/ai';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { Button } from '@/components/Elements';
import { useModal } from '@/hooks/useModal';

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  if (!session) {
    return { redirect: { destination: '/login', permanent: false } };
  }
  return {
    props: {},
  };
};

export default function Home() {
  const { data: sessionData } = useSession();
  const { data: wallets, isLoading: isWalletsLoading } = useWallets(sessionData?.user.id);

  const {
    open: openCreateWallet,
    isOpen: isCreateWalletOpen,
    close: closeCreateWallet,
  } = useModal();

  return (
    <>
      <Head>
        <title>Dashboard | Momney</title>
      </Head>

      <div className="mx-auto max-w-xl p-4">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-500">Wallets</p>
            <Button onClick={() => openCreateWallet()} className="flex items-center gap-1">
              <AiOutlinePlus className="text-2xl" />
              Add Wallet
            </Button>
          </div>

          <div className="flex flex-col gap-2">
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
                <p className="mb-4 text-xs text-gray-500">You have no wallets yet.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <CreateWallet isOpen={isCreateWalletOpen} close={closeCreateWallet} />
    </>
  );
}
