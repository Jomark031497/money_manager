import { z } from 'zod';

export const CreateWalletSchema = z.object({
  name: z
    .string()
    .min(2, 'Wallet name must contain at least (2) characters long')
    .max(150, 'Wallet name must contain at most 150 character(s)'),
  description: z.string().nullish(),
  balance: z.number().nonnegative(),
  userId: z.string().cuid(),
});

export type ICreateWalletInputs = z.infer<typeof CreateWalletSchema>;
