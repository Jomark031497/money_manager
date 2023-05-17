import { WalletSchema } from '@/features/wallets';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

function getTransactionDateFilter(dateRange?: string) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // January is 0, so add 1 to get the correct month number

  switch (dateRange) {
    case 'This Month':
      return {
        gte: new Date(currentYear, currentMonth - 1, 1), // Start of the current month
        lte: new Date(currentYear, currentMonth, 0), // End of the current month
      };
    case 'This Year':
      return {
        gte: new Date(currentYear, 0, 1), // Start of the current year
        lte: new Date(currentYear, 11, 31), // End of the current year
      };
    case 'All Time':
      return {};
    default:
      return {};
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  const query = WalletSchema.shape.query.parse(req.query);

  if (req.method === 'GET') {
    const wallets = await prisma.wallet.findMany({
      where: {
        userId: query.id,
        ...(query.walletId && {
          id: query.walletId,
        }),
      },
      include: {
        Transaction: {
          where: {
            purchaseDate: {
              ...getTransactionDateFilter(query.dateRange),
            },
          },
        },
      },
    });

    const totalBalance = wallets.reduce((acc, wallet) => acc + wallet.balance, 0);

    const totalExpenses = wallets.reduce((acc, wallet) => {
      const expenses = wallet.Transaction.filter((t) => t.type === 'EXPENSE');
      const totalExpensesForWallet = expenses.reduce((acc, transaction) => acc + transaction.amount, 0);
      return acc + totalExpensesForWallet;
    }, 0);

    const totalIncome = wallets.reduce((acc, wallet) => {
      const incomes = wallet.Transaction.filter((t) => t.type === 'INCOME');
      const totalIncomesForWallet = incomes.reduce((acc, transaction) => acc + transaction.amount, 0);
      return acc + totalIncomesForWallet;
    }, 0);

    return res.status(200).json({
      totalBalance,
      totalExpenses,
      totalIncome,
    });
  }
}