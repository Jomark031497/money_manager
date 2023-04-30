import { TransactionType } from '@prisma/client';
import { z } from 'zod';

export const TRANSACTION_TYPES = [TransactionType.EXPENSE, TransactionType.INCOME, TransactionType.TRANSFER] as const;

export const TransactionSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Transaction name must contain at least (2) characters long')
      .max(150, 'Transaction name must contain at most 150 character(s)'),
    purchaseDate: z.date(),
    description: z.string().nullish(),
    type: z.enum(TRANSACTION_TYPES),
    categoryId: z.string(),
    amount: z
      .number({
        invalid_type_error: 'Please enter a valid amount',
      })
      .nonnegative(),
    walletId: z.string(),
    userId: z.string(),
  }),
  query: z.object({
    id: z.string().optional(),
    skip: z.string().optional(),
    take: z.string().optional(),
    filterValue: z.string().optional(),
    filterColumn: z.string().optional(),
  }),
});

export type ITransactionInputs = z.infer<typeof TransactionSchema>;
