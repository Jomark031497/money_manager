import { Transaction, Wallet } from '@prisma/client';

export interface ITransactionWithWallet extends Transaction {
  wallet: Wallet;
}
