import { TransactionType, TransactionCategory } from '@prisma/client';
import { z } from 'zod';

export const TRANSACTION_TYPES = [TransactionType.EXPENSE, TransactionType.INCOME, TransactionType.TRANSFER] as const;

export const TRANSACTION_CATEGORIES = [
  TransactionCategory.Entertainment,
  TransactionCategory.Food_And_Beverage,
  TransactionCategory.Gifts_And_Donation,
  TransactionCategory.Health,
  TransactionCategory.Housing,
  TransactionCategory.Miscellaneous,
  TransactionCategory.Savings,
  TransactionCategory.Personal_Care,
  TransactionCategory.Transportation,
  TransactionCategory.Travel,
  TransactionCategory.Utilities,
] as const;

export const TransactionSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Transaction name must contain at least (2) characters long')
      .max(150, 'Transaction name must contain at most 150 character(s)'),
    date: z.date(),
    description: z.string().nullish(),
    type: z.enum(TRANSACTION_TYPES),
    category: z.enum(TRANSACTION_CATEGORIES),
    amount: z
      .number({
        invalid_type_error: 'Please enter a valid amount',
      })
      .nonnegative(),
    walletId: z.string().cuid(),
    userId: z.string().cuid(),
  }),
  query: z.object({
    id: z.string().cuid().optional(),
    skip: z.string().optional(),
    take: z.string().optional(),
  }),
});

export type ITransactionInputs = z.infer<typeof TransactionSchema>;
