import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  const userId = req.query.id as string;

  if (req.method === 'GET') {
    const query: Prisma.TransactionFindManyArgs = {
      where: {
        userId,
      },
      orderBy: {
        date: 'desc',
      },
      include: {
        wallet: true,
      },
    };

    const [data, count] = await prisma.$transaction([
      prisma.transaction.findMany(query),
      prisma.transaction.count({ where: query.where }),
    ]);

    return res.status(200).json({
      data,
      count,
    });
  }
}
