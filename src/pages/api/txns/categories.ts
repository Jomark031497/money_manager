import { TransactionSchema } from '@/features/transactions';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'GET') {
    const query = TransactionSchema.shape.query.parse(req.query);

    const categories = await prisma.transactionCategory.findMany({
      orderBy: {
        name: 'asc',
      },
      ...(query.filterColumn &&
        query.filterValue && {
          where: {
            [query.filterColumn]: query.filterValue,
          },
        }),
    });
    return res.json(categories);
  }
}
