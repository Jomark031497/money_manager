import { TransactionType } from '@prisma/client';
import { z } from 'zod';

export const TransactionTypes = [
  TransactionType.EXPENSE,
  TransactionType.INCOME,
  TransactionType.TRANSFER,
] as const;

export const CreateTransactionSchema = z.object({
  name: z
    .string()
    .min(2, 'Transaction name must contain at least (2) characters long')
    .max(150, 'Transaction name must contain at most 150 character(s)'),
  date: z.date().optional(),
  description: z.string().nullish(),
  type: z.enum(TransactionTypes),
  amount: z
    .number({
      invalid_type_error: 'Please enter a valid amount',
    })
    .nonnegative(),
  walletId: z.string().cuid(),
  userId: z.string().cuid(),
});

export type ICreateTransactionInputs = z.infer<typeof CreateTransactionSchema>;
