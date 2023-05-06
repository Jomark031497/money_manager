import { WalletCardSkeleton, useWalletsSummary } from '@/features/wallets';
import { toCurrency } from '@/utils/toCurrency';

export const WalletSummary = ({ userId }: { userId: string }) => {
  const { data: summary } = useWalletsSummary({ userId });

  return summary ? (
    <div className="grid grid-cols-3 justify-evenly gap-4 rounded-xl bg-gray-100 p-2">
      <div className="col-span-1 flex flex-col items-center rounded p-2 text-red-600">
        <p className="text-xs font-semibold">Expenses</p>
        <p className="text-sm font-bold">{toCurrency(summary.totalExpenses)}</p>
      </div>

      <div className="col-span-1 flex flex-col items-center rounded p-2 text-green-600">
        <p className="text-xs font-semibold">Income</p>
        <p className="text-sm font-bold">{toCurrency(summary.totalIncome)}</p>
      </div>

      <div className="items col-span-1 flex flex-col items-center p-2">
        <p className="text-xs font-semibold">Balance</p>
        <p className="text-sm font-bold">{toCurrency(summary.totalBalance)}</p>
      </div>
    </div>
  ) : (
    <WalletCardSkeleton />
  );
};
