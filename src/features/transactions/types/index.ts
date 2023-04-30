import { Transaction, TransactionCategory, Wallet } from '@prisma/client';

export interface ITransactionWithWallet extends Transaction {
  wallet: Wallet;
  category: TransactionCategory;
}
