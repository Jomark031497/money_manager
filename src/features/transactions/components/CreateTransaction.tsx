import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@/lib/client';
import { toast } from 'react-toastify';
import { Button, InputField, Modal, SelectField, Spinner } from '@/components/Elements';
import { useSession } from 'next-auth/react';

import {
  TransactionSchema,
  ITransactionInputs,
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
  createTransaction,
} from '@/features/transactions';
import { useWallets } from '@/features/wallets';
import { formatDateWithTimezone } from '@/utils/formatDateWithTimezone';

interface Props {
  isOpen: boolean;
  close: () => void;
}

export const CreateTransaction = ({ isOpen, close }: Props) => {
  const { data: sessionData } = useSession();
  const { data: wallets } = useWallets(sessionData?.user.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ITransactionInputs['body']>({
    resolver: zodResolver(TransactionSchema.shape.body),
    defaultValues: { amount: 0 },
  });

  const onSubmit: SubmitHandler<ITransactionInputs['body']> = async (values) => {
    try {
      await createTransaction({
        ...values,
      });
      reset();
      queryClient.invalidateQueries(['transactions']);
      queryClient.invalidateQueries(['wallets']);
      toast.success('Transaction created successfully.');
      close();
    } catch (error) {
      toast.error('Transaction creation failed.');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={close} title="Create Transaction" size="max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 p-4">
          <InputField label="Name *" {...register('name')} formError={errors.name} className="col-span-3" />

          <InputField
            label="Description"
            {...register('description')}
            formError={errors.description}
            className="col-span-2"
          />

          <SelectField label="Type" {...register('type')} formError={errors.type} className="col-span-2">
            {TRANSACTION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </SelectField>

          <InputField
            label="Amount *"
            formError={errors.amount}
            className="col-span-2"
            {...register('amount', {
              valueAsNumber: true,
            })}
          />

          <InputField
            label="Date *"
            type="date"
            formError={errors.date}
            className="col-span-2"
            {...register('date', {
              valueAsDate: true,
            })}
            defaultValue={formatDateWithTimezone(new Date(), 'yyyy-MM-dd')}
          />

          <SelectField label="Category" {...register('category')} formError={errors.category} className="col-span-3">
            {TRANSACTION_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category.replaceAll('_', ' ')}
              </option>
            ))}
          </SelectField>

          <InputField
            label="User ID"
            className="hidden"
            {...register('userId')}
            formError={errors.userId}
            defaultValue={sessionData?.user.id}
          />

          {wallets?.data && (
            <SelectField label="Wallet" {...register('walletId')} formError={errors.type} className="col-span-3">
              {wallets.data.map((wallet) => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet.name}
                </option>
              ))}
            </SelectField>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="col-span-3 flex items-center justify-center gap-2 py-2"
          >
            {isSubmitting ? (
              <>
                Submitting
                <Spinner />
              </>
            ) : (
              'Create'
            )}
          </Button>
        </form>
      </Modal>
    </>
  );
};
