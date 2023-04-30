import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@/lib/client';
import { toast } from 'react-toastify';
import { Button, InputField, Modal, SelectField, Spinner } from '@/components/Elements';
import { useSession } from 'next-auth/react';
import {
  TransactionSchema,
  ITransactionInputs,
  TRANSACTION_TYPES,
  createTransaction,
  useCategories,
} from '@/features/transactions';
import { useWallets } from '@/features/wallets';
import { useMutation } from '@tanstack/react-query';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { classNames } from '@/utils/classNames';
import { AiOutlineCalendar } from 'react-icons/ai';

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
    watch,
    control,
    formState: { isSubmitting, errors },
  } = useForm<ITransactionInputs['body']>({
    resolver: zodResolver(TransactionSchema.shape.body),
    defaultValues: { amount: 0 },
  });

  const typeValue = watch('type');

  const { data: categories } = useCategories({
    options: {
      filterColumn: 'type',
      filterValue: typeValue,
    },
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

        <InputField label="Transaction Name *" {...register('name')} formError={errors.name} className="col-span-3" />

        <InputField
          label="Description"
          {...register('description')}
          formError={errors.description}
          className="col-span-2"
        />

        <div className="col-span-2">
          <InputField
            label="Amount *"
            formError={errors.amount}
            className="col-span-1"
            {...register('amount', { valueAsNumber: true })}
          />
        </div>

        {wallets?.data && (
          <SelectField label="Wallet" {...register('walletId')} formError={errors.type} className="col-span-3">
            {wallets.data.map((wallet) => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.emoji} {wallet.name}
              </option>
            ))}
          </SelectField>
        )}

        <label className="col-span-2 mb-4 block text-sm font-semibold text-gray-500">
          Purchase Date
          <Controller
            control={control}
            name="purchaseDate"
            defaultValue={new Date()}
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
          {isSubmitting ? <Spinner /> : 'Create'}
        </Button>
      </form>
    </Modal>
  );
};
