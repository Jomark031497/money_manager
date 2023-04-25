import { TransactionSchema } from '@/features/transactions';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'POST') {
    const body = TransactionSchema.shape.body.parse({
      ...req.body,
      date: new Date(req.body.date),
    });

    const [transaction] = await prisma.$transaction([
      prisma.transaction.create({
        data: body,
      }),
      prisma.wallet.update({
        where: { id: body.walletId },
        data: {
          balance: body.type === 'EXPENSE' ? { decrement: body.amount } : { increment: body.amount },
        },
      }),
    ]);

    return res.json(transaction);
  }
}
