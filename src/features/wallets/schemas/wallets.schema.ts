import { z } from 'zod';

export const WalletSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(150),
    description: z.string().max(50),
    balance: z.number().nonnegative(),
    userId: z.string().cuid(),
  }),
  query: z.object({
    id: z.string().cuid().optional(),
    skip: z.string().optional(),
    take: z.string().optional(),
  }),
});

export type IWalletInputs = z.infer<typeof WalletSchema>;
