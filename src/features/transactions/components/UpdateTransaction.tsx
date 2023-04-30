import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@/lib/client';
import { toast } from 'react-toastify';
import { Button, InputField, Modal, SelectField, Spinner } from '@/components/Elements';
import { useSession } from 'next-auth/react';
import {
  ITransactionInputs,
  ITransactionWithWallet,
  TRANSACTION_TYPES,
  TransactionSchema,
  updateTransaction,
  useCategories,
} from '@/features/transactions';
import { useMutation } from '@tanstack/react-query';
import { classNames } from '@/utils/classNames';
import ReactDatePicker from 'react-datepicker';
import { AiOutlineCalendar } from 'react-icons/ai';

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
    watch,
    control,
    formState: { isSubmitting, errors },
  } = useForm<Partial<ITransactionInputs['body']>>({
    resolver: zodResolver(TransactionSchema.shape.body.partial()),
    defaultValues: { ...rest },
  });

  const typeValue = watch('type');

  const { data: categories } = useCategories({
    options: {
      filterColumn: 'type',
      filterValue: typeValue,
    },
  });

  const mutation = useMutation({
    mutationFn: (values: Partial<ITransactionInputs['body']>) => updateTransaction(transaction.id, values),
    onSuccess: () => {
      queryClient.invalidateQueries(['transaction']);
      queryClient.invalidateQueries({ queryKey: ['walletsSummary'] });
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
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
          <div className="col-span-3 grid grid-cols-2 gap-2">
            <SelectField label="Type" {...register('type')} formError={errors.type} className="col-span-1">
              {TRANSACTION_TYPES.map((type) => (
                <option key={type} value={type} className="">
                  {type}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Category"
              {...register('categoryId')}
              formError={errors.categoryId}
              className="col-span-1"
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.emoji} {category.name}
                </option>
              ))}
            </SelectField>
          </div>

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
          </div>

          <InputField
            label="User ID"
            className="hidden"
            {...register('userId')}
            formError={errors.userId}
            defaultValue={sessionData?.user.id}
          />

          <label className="col-span-2 mb-4 block text-sm font-semibold text-gray-500">
            Purchase Date
            <Controller
              control={control}
              name="purchaseDate"
              defaultValue={new Date(purchaseDate)}
              render={({ field: { onChange, value } }) => (
                <div className="relative">
                  <ReactDatePicker
                    onChange={onChange}
                    selected={value}
                    className={classNames(
                      'mt-1 w-full appearance-none rounded border-2 p-2 px-3 font-sans leading-tight text-gray-500 shadow outline-none transition-all hover:border-primary focus:border-primary',
                    )}
                  />
                  <AiOutlineCalendar className="absolute inset-y-3 right-2 cursor-pointer text-xl" />
                </div>
              )}
            />
          </label>

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
