import { Button } from '@/components/Elements';
import { CreateWallet, WalletCard, WalletCardSkeleton, useWallets } from '@/features/wallets';
import { useModal } from '@/hooks/useModal';
import { motion } from 'framer-motion';
import { AiOutlinePlus } from 'react-icons/ai';

export const Wallets = ({ userId }: { userId: string }) => {
  const { data: wallets, isLoading: isWalletsLoading } = useWallets(userId);
  const { open: openCreate, isOpen: isCreateOpen, close: closeCreate } = useModal();

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-semibold text-gray-500">Wallets</p>
        <Button onClick={() => openCreate()} className="flex items-center gap-1">
          <AiOutlinePlus className="text-xl" />
          Create Wallet
        </Button>
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-gray-100 p-2">
        {isWalletsLoading ? (
          <>
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
          </>
        ) : wallets?.data.length ? (
          wallets?.data.map((wallet, index) => (
            <motion.div
              key={wallet.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <WalletCard wallet={wallet} />
            </motion.div>
          ))
        ) : (
          <p className="text-md text-center font-semibold text-gray-500">You have no wallets yet.</p>
        )}
      </div>

      <CreateWallet isOpen={isCreateOpen} close={closeCreate} />
    </>
  );
};
