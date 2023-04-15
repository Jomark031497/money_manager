import { z } from 'zod';
import { CreateWalletSchema } from './create.schema';

export const UpdateWalletSchema = CreateWalletSchema.partial();

export type IUpdateWalletInputs = z.infer<typeof UpdateWalletSchema>;
