import { WalletSchema } from '@/features/wallets';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  const query = WalletSchema.shape.query.parse(req.query);

  if (req.method === 'GET') {
    const wallets = await prisma.wallet.findMany({
      where: { userId: query.id },
      include: {
        Transaction: true,
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
