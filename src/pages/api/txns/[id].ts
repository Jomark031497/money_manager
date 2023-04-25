import { TransactionSchema } from '@/features/transactions';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  const query = TransactionSchema.shape.query.parse(req.query);

  const transaction = await prisma.transaction.findUnique({
    where: { id: query.id },
    include: { wallet: true },
  });

  if (req.method === 'GET') {
    return res.json(transaction);
  } else if (req.method === 'PUT') {
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    const createdAt = new Date(req.body.createdAt);
    const body = TransactionSchema.shape.body.partial().parse({ ...req.body, createdAt });
    const wallet = transaction.wallet;

    const currentWalletBalance = wallet.balance;
    const previousTransactionAmount = transaction.amount;
    const previousTransactionType = transaction.type;

    // Revert the currentWalletBalance to the amount prior to updating
    const revertedWalletBalance =
      previousTransactionType === 'EXPENSE'
        ? currentWalletBalance + previousTransactionAmount
        : currentWalletBalance - previousTransactionAmount;

    // Calculate the new balance
    const newWalletBalance = body.amount
      ? body.type === 'EXPENSE'
        ? revertedWalletBalance - body.amount
        : revertedWalletBalance + body.amount
      : wallet.balance;

    const [updatedTransaction] = await prisma.$transaction([
      prisma.transaction.update({
        where: { id: query.id },
        data: body,
      }),
      prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: newWalletBalance,
        },
      }),
    ]);
    return res.status(200).json(updatedTransaction);
  } else if (req.method === 'DELETE') {
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    const wallet = transaction.wallet;

    const updatedBalance =
      transaction.type === 'INCOME' ? wallet.balance - transaction.amount : wallet.balance + transaction.amount;

    const [txn] = await prisma.$transaction([
      prisma.transaction.delete({ where: { id: query.id } }),
      prisma.wallet.update({
        where: {
          id: wallet.id,
        },
        data: {
          balance: updatedBalance,
        },
      }),
    ]);

    return res.json(txn);
  }
};

export default handler;
