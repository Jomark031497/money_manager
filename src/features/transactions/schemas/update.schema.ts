import { z } from 'zod';
import { CreateTransactionSchema } from './create.schema';

export const UpdateTransactionSchema = CreateTransactionSchema.partial();

export type IUpdateTransactionInputs = z.infer<typeof UpdateTransactionSchema>;
