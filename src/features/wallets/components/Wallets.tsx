import { Button } from '@/components/Elements';
import { CreateWallet, WalletCard, WalletCardSkeletonContainer, useWallets } from '@/features/wallets';
import { useModal } from '@/hooks/useModal';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export const Wallets = ({ userId }: { userId: string }) => {
  const [parent] = useAutoAnimate();

  const { data: wallets, isLoading: isWalletsLoading } = useWallets(userId);
  const { open: openCreate, isOpen: isCreateOpen, close: closeCreate } = useModal();

  return (
    <section ref={parent} className="flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-semibold text-gray-500">Wallets</p>
        <Button onClick={() => openCreate()}>Create Wallet</Button>
      </div>

      <ul className="flex flex-col gap-2">
        {isWalletsLoading ? (
          <WalletCardSkeletonContainer count={3} />
        ) : (
          wallets?.data.map((wallet) => <WalletCard wallet={wallet} key={wallet.id} />)
        )}
        {!isWalletsLoading && !wallets?.data.length && (
          <p className="text-md text-center font-semibold text-gray-500">You have no wallets yet.</p>
        )}
      </ul>
      <CreateWallet isOpen={isCreateOpen} close={closeCreate} userId={userId} />
    </section>
  );
};
