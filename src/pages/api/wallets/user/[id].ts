import { WalletSchema } from '@/features/wallets';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  const query = WalletSchema.shape.query.parse(req.query);

  if (req.method === 'GET') {
    const findManyOptions: Prisma.WalletFindManyArgs = {
      where: { userId: query.id },
      orderBy: { balance: 'desc' },
    };

    const [data, count] = await prisma.$transaction([
      prisma.wallet.findMany(findManyOptions),
      prisma.wallet.count({ where: findManyOptions.where }),
    ]);

    return res.status(200).json({
      data,
      count,
    });
  }
}
