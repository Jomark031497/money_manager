import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@/lib/client';
import { toast } from 'react-toastify';
import { Button, InputField, Modal, SelectField, Spinner } from '@/components/Elements';
import { useSession } from 'next-auth/react';
import {
  ITransactionWithWallet,
  IUpdateTransactionInputs,
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
  UpdateTransactionSchema,
  updateTransaction,
} from '@/features/transactions';

interface Props {
  isOpen: boolean;
  close: () => void;
  transaction: ITransactionWithWallet;
}

export const UpdateTransaction = ({ isOpen, close, transaction }: Props) => {
  const { data: sessionData } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IUpdateTransactionInputs>({
    resolver: zodResolver(UpdateTransactionSchema),
    defaultValues: { ...transaction },
  });

  const onSubmit: SubmitHandler<IUpdateTransactionInputs> = async (values) => {
    try {
      await updateTransaction(transaction.id, values);
      reset();
      queryClient.invalidateQueries(['transaction']);
      toast.success('Transaction updated successfully.');
      close();
    } catch (error) {
      toast.error('Transaction update failed.');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={close} title="Update Transaction" size="max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 p-4">
          <InputField
            label="Name *"
            {...register('name')}
            formError={errors.name}
            className="col-span-3"
          />

          <InputField
            label="Description"
            {...register('description')}
            formError={errors.description}
            className="col-span-3"
          />

          <InputField
            label="Amount *"
            {...register('amount', {
              valueAsNumber: true,
            })}
            formError={errors.amount}
            className="col-span-3"
          />

          <InputField
            label="Date *"
            type="date"
            formError={errors.date}
            className="col-span-2"
            {...register('date', {
              valueAsDate: true,
            })}
            defaultValue={Date.now()}
          />

          <SelectField
            label="Type"
            {...register('type')}
            formError={errors.type}
            className="col-span-2"
          >
            {TRANSACTION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </SelectField>

          <SelectField
            label="Category"
            {...register('category')}
            formError={errors.category}
            className="col-span-3"
          >
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
