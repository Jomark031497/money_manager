import { toCurrency } from '@/utils/toCurrency';
import { Wallet } from '@prisma/client';
import Link from 'next/link';

interface Props {
  wallet: Wallet;
}

export const WalletCard = ({ wallet }: Props) => {
  return (
    <li className="rounded-md bg-gradient-to-tr from-orange-600 to-primary p-2 text-white shadow">
      <Link href={`/wallets/${wallet.id}`} className="grid grid-cols-5">
        <div className="col-span-3 grid grid-cols-5">
          <div className="col-span-1 flex h-8 w-8 items-center justify-center rounded-full bg-white">
            {wallet.emoji}
          </div>

          <div className="col-span-4">
            <p className="truncate text-sm font-semibold tracking-wide">{wallet.name}</p>
            <p className="truncate text-xs tracking-wide">{wallet.description}</p>
          </div>
        </div>

        <div className="col-span-2 justify-self-end text-right">
          <p className="text-xs tracking-wide">Current Balance</p>
          <p className="text-sm font-bold">{toCurrency(wallet.balance)}</p>
        </div>
      </Link>
    </li>
  );
};
