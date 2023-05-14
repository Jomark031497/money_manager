import { z } from 'zod';

export const WalletSchema = z.object({
  body: z.object({
    emoji: z.string().emoji(),
    name: z.string().min(1, "Please enter wallet's name").max(100, 'Wallet name must not exceed 100 characters'),
    description: z.string().max(50, 'Description must not exceed 50 characters long'),
    balance: z.number({ invalid_type_error: 'Please enter a valid amount' }),
    userId: z.string(),
  }),
  query: z.object({
    id: z.string().optional(),
    skip: z.string().optional(),
    take: z.string().optional(),
    walletId: z.string().optional(),
    dateRange: z.string().optional(),
  }),
});

export type IWalletInputs = z.infer<typeof WalletSchema>;
