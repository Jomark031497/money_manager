import { toCurrency } from '@/utils/toCurrency';
import { Wallet } from '@prisma/client';
import Link from 'next/link';

interface Props {
  wallet: Wallet;
}

export const WalletCard = ({ wallet }: Props) => {
  return (
    <li className="rounded border p-2 shadow">
      <Link href={`/wallets/${wallet.id}`} className="grid grid-cols-4 ">
        <div className="col-span-2 flex items-center gap-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xl shadow">
            {wallet.emoji}
          </div>

          <div>
            <p className="truncate text-sm font-semibold tracking-wide">{wallet.name}</p>
            <p className="truncate text-xs font-semibold tracking-wide text-gray-500">{wallet.description}</p>
          </div>
        </div>

        <div className="col-span-2 justify-self-end text-right">
          <p className="text-xs font-semibold tracking-wide text-gray-500">Current Balance</p>
          <p className="text-sm font-bold">{toCurrency(wallet.balance)}</p>
        </div>
      </Link>
    </li>
  );
};
