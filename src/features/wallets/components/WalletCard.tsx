import { toCurrency } from '@/utils/toCurrency';
import { Wallet } from '@prisma/client';
import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi';

interface Props {
  wallet: Wallet;
}

export const WalletCard = ({ wallet }: Props) => {
  return (
    <Link
      key={wallet.id}
      href={`/wallets/${wallet.id}`}
      className="my-auto grid grid-cols-4 rounded-xl bg-gradient-to-tr from-red-600 to-orange-500 p-2 text-white shadow-xl"
    >
      <div className="col-span-3 flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border bg-white text-2xl">
          {wallet.emoji}
        </span>
        <div>
          <p className="truncate text-sm font-bold">{wallet.name}</p>
          <p className="truncate text-xs font-semibold">{wallet.description}</p>
        </div>
      </div>

      <button
        aria-label={`Go to wallet ${wallet.name}`}
        className="col-span-1 self-start justify-self-end rounded-full bg-black/50  text-lg transition-all hover:bg-black/30"
      >
        <HiChevronRight />
      </button>

      <div className="col-span-4 justify-self-end text-right">
        <p className="text-xs font-semibold">Current Balance</p>
        <p className="text-md font-bold">{toCurrency(wallet.balance)}</p>
      </div>
    </Link>
  );
};
