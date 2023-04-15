import { z } from 'zod';

export const CreateWalletSchema = z.object({
  name: z
    .string()
    .min(6, 'Wallet name must contain at least (6) characters long')
    .max(150, 'Wallet name must contain at most 150 character(s)'),
  description: z.string().optional(),
  balance: z.number().nonnegative(),
  userId: z.string().cuid(),
});

export type ICreateWalletInputs = z.infer<typeof CreateWalletSchema>;
