import { Button } from '@/components/Elements';
import { CreateWallet, WalletCard, WalletCardSkeleton, useWallets } from '@/features/wallets';
import { useModal } from '@/hooks/useModal';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FaWallet } from 'react-icons/fa';

export const Wallets = ({ userId }: { userId: string }) => {
  const { data: wallets, isLoading: isWalletsLoading } = useWallets(userId);
  const { open: openCreate, isOpen: isCreateOpen, close: closeCreate } = useModal();
  const [parent] = useAutoAnimate();

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <p className="font-semibold text-gray-500">Wallets</p>
        <Button onClick={() => openCreate()} className="flex items-center gap-1">
          <FaWallet className="text-xl" />
          Create Wallet
        </Button>
      </div>

      <div ref={parent} className="flex flex-col gap-1 rounded-xl border bg-gray-50 p-2 shadow">
        {isWalletsLoading ? (
          <>
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
          </>
        ) : wallets?.data.length ? (
          wallets?.data.map((wallet) => <WalletCard wallet={wallet} key={wallet.id} />)
        ) : (
          <p className="text-md text-center font-semibold text-gray-500">You have no wallets yet.</p>
        )}
      </div>

      <CreateWallet isOpen={isCreateOpen} close={closeCreate} userId={userId} />
    </>
  );
};
