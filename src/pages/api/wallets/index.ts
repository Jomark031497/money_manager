import { CreateWalletSchema } from '@/features/wallets';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'POST') {
    // Validate inputs
    const body = CreateWalletSchema.parse(req.body);

    const wallet = await prisma.wallet.create({
      data: body,
    });

    return res.status(200).json(wallet);
  }
}
