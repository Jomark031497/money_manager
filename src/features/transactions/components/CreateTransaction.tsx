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
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';

interface Props {
  isOpen: boolean;
  close: () => void;
  userId: string;
}

export const CreateTransaction = ({ isOpen, close, userId }: Props) => {
  const { data: sessionData } = useSession();
  const { data: wallets } = useWallets(userId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ITransactionInputs['body']>({
    resolver: zodResolver(TransactionSchema.shape.body),
    defaultValues: { amount: 0 },
  });

  const mutation = useMutation({
    mutationFn: (payload: ITransactionInputs['body']) => createTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      reset();
      close();
      toast.success('Transaction created successfully.');
    },
  });

  const onSubmit: SubmitHandler<ITransactionInputs['body']> = async (values) => {
    try {
      mutation.mutateAsync(values);
    } catch (error) {
      toast.error('Transaction creation failed.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Create Transaction">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 p-4">
        <InputField label="Transaction Name *" {...register('name')} formError={errors.name} className="col-span-3" />

        <InputField
          label="Description"
          {...register('description')}
          formError={errors.description}
          className="col-span-2"
        />

        <div className="col-span-3 grid grid-cols-2 gap-2">
          <InputField
            label="Amount *"
            formError={errors.amount}
            className="col-span-1"
            {...register('amount', { valueAsNumber: true })}
          />
          <SelectField label="Type" {...register('type')} formError={errors.type} className="col-span-1">
            {TRANSACTION_TYPES.map((type) => (
              <option key={type} value={type} className="">
                {type}
              </option>
            ))}
          </SelectField>
        </div>

        {wallets?.data && (
          <SelectField label="Wallet" {...register('walletId')} formError={errors.type} className="col-span-3">
            {wallets.data.map((wallet) => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.name}
              </option>
            ))}
          </SelectField>
        )}

        <div className="col-span-3 grid grid-cols-2 gap-2">
          <SelectField label="Category" {...register('category')} formError={errors.category} className="col-span-1">
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

          <InputField
            label="Date *"
            type="date"
            formError={errors.purchaseDate}
            defaultValue={format(new Date(), 'yyyy-MM-dd')}
            className="col-span-1 appearance-none"
            {...register('purchaseDate', {
              valueAsDate: true,
            })}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="col-span-3 flex items-center justify-center gap-2 py-2"
        >
          {isSubmitting ? <Spinner /> : 'Create'}
        </Button>
      </form>
    </Modal>
  );
};
