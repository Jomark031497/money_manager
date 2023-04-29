import { z } from 'zod';

const emojiRegex = /^[\u{1F000}-\u{1F6FF}]$/u;

export const WalletSchema = z.object({
  body: z.object({
    emoji: z
      .string()
      .refine((value) => emojiRegex.test(value), {
        message: 'Please enter only one emoji character',
      })
      .nullish(),
    name: z.string().min(1, "Please enter wallet's name").max(100, 'Wallet name must not exceed 100 characters'),
    description: z
      .string()
      .min(1, 'Please enter a short description')
      .max(50, 'Description must not exceed 50 characters long'),
    balance: z
      .number({ invalid_type_error: 'Please enter a valid amount' })
      .nonnegative('Number not be a negative amount'),
    userId: z.string(),
  }),
  query: z.object({
    id: z.string().optional(),
    skip: z.string().optional(),
    take: z.string().optional(),
  }),
});

export type IWalletInputs = z.infer<typeof WalletSchema>;
