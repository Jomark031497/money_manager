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
      href={`/`}
      className="grid min-h-[100px] grid-cols-4 rounded-xl bg-gradient-to-tr from-red-600 to-orange-500 px-2 py-2 text-white shadow-xl"
    >
      <div className="col-span-3 flex items-center gap-2">
        <div>
          <p className="text-sm font-bold">{wallet.name}</p>
          <p className="text-sm font-semibold">{wallet.description}</p>
        </div>
      </div>

      <button className="col-span-1 self-start justify-self-end rounded-full bg-black/50 p-1 text-lg transition-all hover:bg-black/30">
        <HiChevronRight />
      </button>

      <div className="col-span-4 justify-self-end text-right">
        <p className="text-xs font-semibold">Current Balance</p>
        <p className="text-lg font-bold">{toCurrency(wallet.balance)}</p>
      </div>
    </Link>
  );
};
