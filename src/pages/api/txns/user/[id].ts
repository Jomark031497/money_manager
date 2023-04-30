import { TransactionSchema } from '@/features/transactions';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  const query = TransactionSchema.shape.query.parse(req.query);

  const skip = parseInt(query.skip ?? '0');
  const take = parseInt(query.take ?? '5');
  const filterValue = query.filterValue;
  const filterColumn = query.filterColumn as string;

  if (req.method === 'GET') {
    const findManyQuery: Prisma.TransactionFindManyArgs = {
      include: { wallet: true, category: true },
      orderBy: { purchaseDate: 'desc' },
      where: {
        userId: query.id,
        [filterColumn]: filterValue,
      },
      skip: skip * take,
      take,
    };

    const [data, count] = await prisma.$transaction([
      prisma.transaction.findMany(findManyQuery),
      prisma.transaction.count({ where: findManyQuery.where }),
    ]);

    return res.status(200).json({
      data,
      count,
    });
  }
}
