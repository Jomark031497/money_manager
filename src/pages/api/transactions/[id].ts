import { TransactionSchema } from '@/features/transactions';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    const body = TransactionSchema.shape.body.parse({
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
        where: { id: query.id },
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
