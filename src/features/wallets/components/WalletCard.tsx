import { toCurrency } from '@/utils/toCurrency';
import { Wallet } from '@prisma/client';
import Link from 'next/link';

interface Props {
  wallet: Wallet;
}

export const WalletCard = ({ wallet }: Props) => {
  return (
    <Link
      key={wallet.id}
      href={`/wallets/${wallet.id}`}
      className="my-auto grid grid-cols-4 rounded bg-violet-100 bg-gradient-to-tr from-red-600 to-primary p-2 text-primary-contrast"
    >
      <div className="col-span-2 flex items-center gap-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xl">{wallet.emoji}</div>

        <div>
          <p className="truncate text-sm font-bold tracking-wide">{wallet.name}</p>
          <p className="truncate text-xs font-semibold tracking-wide">{wallet.description}</p>
        </div>
      </div>

      <div className="col-span-2 justify-self-end text-right">
        <p className="text-xs font-semibold tracking-wide">Current Balance</p>
        <p className="text-sm font-bold">{toCurrency(wallet.balance)}</p>
      </div>
    </Link>
  );
};
