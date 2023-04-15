import { UpdateWalletSchema } from '@/features/wallets';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  const id = req.query.id as string;

  const wallet = await prisma.wallet.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

  if (req.method === 'GET') {
    return res.status(200).json(wallet);
  }

  if (req.method === 'PUT') {
    const body = UpdateWalletSchema.parse(req.body);

    const updatedWallet = await prisma.wallet.update({
      where: { id },
      data: body,
    });

    return res.status(200).json(updatedWallet);
  }

  if (req.method === 'DELETE') {
    const deletedWallet = await prisma.wallet.delete({
      where: { id: wallet.id },
    });

    return res.status(200).json(deletedWallet);
  }
}
