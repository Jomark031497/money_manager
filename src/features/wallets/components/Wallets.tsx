import { Button } from '@/components/Elements';
import { CreateWallet, WalletCard, useWallets } from '@/features/wallets';
import { useModal } from '@/hooks/useModal';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface Props {
  userId: string;
}

const Skeleton = () => {
  return (
    <div className="my-auto grid h-[52px] animate-pulse grid-cols-4 rounded bg-gray-300 p-2">
      <div className="col-span-2 flex items-center gap-1">
        <div className="h-8 w-8 rounded-full bg-gray-700" />
        <div>
          <div className=" mb-2 h-2 w-36 rounded-full bg-gray-700" />
          <div className=" h-1.5 w-32 rounded-full bg-gray-700" />
        </div>
      </div>
      <div className="col-span-2 flex flex-col items-end justify-center">
        <div className="mb-2 h-1.5 w-32 rounded-full bg-gray-700" />
        <div className="h-2 w-24 rounded-full bg-gray-700" />
      </div>
    </div>
  );
};

export const Wallets = ({ userId }: Props) => {
  const [parent] = useAutoAnimate();

  const { data: wallets, isLoading: isWalletsLoading } = useWallets(userId);
  const { open, isOpen, close } = useModal();

  return (
    <>
      <section>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-lg font-semibold tracking-wide text-gray-700">Wallets</p>
          <Button
            onClick={open}
            className="border-secondary text-secondary hover:bg-secondary hover:text-white"
          >
            Create
          </Button>
        </div>

        <ul
          ref={parent}
          className="flex flex-col gap-2 rounded-lg border bg-white px-2 py-4 shadow"
        >
          {isWalletsLoading ? (
            <div role="status">
              <Skeleton />
            </div>
          ) : (
            wallets?.data.map((wallet) => <WalletCard wallet={wallet} key={wallet.id} />)
          )}
          {!isWalletsLoading && !wallets?.data.length && (
            <p className="text-md text-center font-semibold text-gray-500">
              You have no wallets yet.
            </p>
          )}
        </ul>
      </section>
      <CreateWallet isOpen={isOpen} close={close} userId={userId} />
    </>
  );
};
