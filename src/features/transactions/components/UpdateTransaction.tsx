import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@/lib/client';
import { toast } from 'react-toastify';
import { Button, InputField, Modal, SelectField, Spinner } from '@/components/Elements';
import { useSession } from 'next-auth/react';
import {
  ITransactionInputs,
  ITransactionWithWallet,
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
  TransactionSchema,
  updateTransaction,
} from '@/features/transactions';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';

interface Props {
  isOpen: boolean;
  close: () => void;
  transaction: ITransactionWithWallet;
}

export const UpdateTransaction = ({ isOpen, close, transaction }: Props) => {
  const { data: sessionData } = useSession();

  const { purchaseDate, ...rest } = transaction;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<Partial<ITransactionInputs['body']>>({
    resolver: zodResolver(TransactionSchema.shape.body.partial()),
    defaultValues: { ...rest },
  });

  const mutation = useMutation({
    mutationFn: (values: Partial<ITransactionInputs['body']>) => updateTransaction(transaction.id, values),
    onSuccess: () => {
      queryClient.invalidateQueries(['transaction']);
      reset();
      close();
      toast.success('Transaction updated successfully.');
    },
  });

  const onSubmit: SubmitHandler<Partial<ITransactionInputs['body']>> = async (values) => {
    try {
      mutation.mutate(values);
    } catch (error) {
      toast.error('Transaction update failed.');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={close} title="Update Transaction">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 p-4">
          <InputField label="Name *" {...register('name')} formError={errors.name} className="col-span-3" />

          <InputField
            label="Description"
            {...register('description')}
            formError={errors.description}
            className="col-span-3"
          />

          <div className="col-span-3 grid grid-cols-2 gap-2">
            <InputField
              label="Amount *"
              {...register('amount', {
                valueAsNumber: true,
              })}
              formError={errors.amount}
              className="col-span-1"
            />

            <SelectField label="Type" {...register('type')} formError={errors.type} className="col-span-1">
              {TRANSACTION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </SelectField>
          </div>

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

          <InputField
            label="Date *"
            type="date"
            formError={errors.purchaseDate}
            className="col-span-2"
            defaultValue={format(new Date(purchaseDate), 'yyyy-MM-dd')}
            {...register('purchaseDate', {
              valueAsDate: true,
            })}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="col-span-3 flex items-center justify-center gap-2 py-2"
          >
            {isSubmitting ? <Spinner /> : 'Create'}
          </Button>
        </form>
      </Modal>
    </>
  );
};
