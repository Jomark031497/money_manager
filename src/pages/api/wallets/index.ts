import { WalletSchema } from '@/features/wallets';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'POST') {
    const body = WalletSchema.shape.body.parse(req.body);

    const wallet = await prisma.wallet.create({
      data: {
        ...body,
      },
    });

    await prisma.transaction.create({
      data: {
        name: 'Initial Balance',
        category: 'Miscellaneous',
        type: 'INCOME',
        amount: body.balance,
        walletId: wallet.id,
        description: 'Initial Balance',
        userId: session.user.id,
      },
    });

    return res.status(200).json(wallet);
  }
}
