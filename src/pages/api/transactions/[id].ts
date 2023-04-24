import { UpdateTransactionSchema } from '@/features/transactions';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  const id = req.query.id as string;
  const transaction = await prisma.transaction.findUnique({
    where: { id },
    include: { wallet: true },
  });

  if (req.method === 'GET') {
    return res.json(transaction);
  } else if (req.method === 'PUT') {
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    const body = UpdateTransactionSchema.parse({
      ...req.body,
      date: new Date(req.body.date),
    });

    const wallet = transaction.wallet;

    const newBalance = body.amount
      ? transaction.type === 'INCOME'
        ? wallet.balance + (body.amount - transaction.amount)
        : wallet.balance - (body.amount - transaction.amount)
      : wallet.balance;

    const [updatedTransaction] = await prisma.$transaction([
      prisma.transaction.update({
        where: { id },
        data: body,
      }),
      prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: newBalance,
        },
      }),
    ]);

    return res.status(200).json(updatedTransaction);
  }
}
