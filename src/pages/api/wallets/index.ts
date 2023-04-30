import { WalletSchema } from '@/features/wallets';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'POST') {
    const data = WalletSchema.shape.body.parse(req.body);

    const wallet = await prisma.wallet.create({
      data,
    });

    await prisma.transaction.create({
      data: {
        name: 'Initial Balance',
        description: `Initial Balance`,
        type: data.balance < 0 ? 'EXPENSE' : 'INCOME',
        categoryId: data.balance < 0 ? 'clh2totnq0000ijdfvt4bzu06' : 'clh2totnq0002ijdfy4zekzjc',
        amount: Math.abs(wallet.balance),
        userId: wallet.userId,
        walletId: wallet.id,
      },
    });

    return res.status(200).json(wallet);
  }
}
