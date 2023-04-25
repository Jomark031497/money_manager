import { IWalletInputs, WalletSchema, createWallet } from '@/features/wallets';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@/lib/client';
import { toast } from 'react-toastify';
import { Button, InputField, Modal, Spinner } from '@/components/Elements';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';

interface Props {
  isOpen: boolean;
  close: () => void;
}

export const CreateWallet = ({ isOpen, close }: Props) => {
  const { data: sessionData } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IWalletInputs['body']>({
    resolver: zodResolver(WalletSchema.shape.body),
    defaultValues: { balance: 0 },
  });

  const mutation = useMutation({
    mutationFn: (payload: IWalletInputs['body']) => createWallet(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['wallets']);
      reset();
      close();
      toast.success('Card created successfully.', {
        delay: 500,
      });
    },
  });

  const onSubmit: SubmitHandler<IWalletInputs['body']> = async (values) => {
    try {
      mutation.mutate(values);
    } catch (error) {
      toast.error('Card creation failed.');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={close} title="Create Wallet" size="max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 p-4">
          <InputField
            label="Wallet Name *"
            placeholder="Acme Debit Card, X Digital Wallet"
            formError={errors.name}
            className="col-span-3"
            {...register('name')}
          />

          <InputField
            label="Description *"
            placeholder="Payroll, Savings, Credit Card"
            formError={errors.description}
            className="col-span-2"
            {...register('description')}
          />

          <InputField
            label="Initial Balance *"
            className="col-span-2"
            formError={errors.balance}
            {...register('balance', { valueAsNumber: true })}
          />

          <InputField
            label="User ID"
            defaultValue={sessionData?.user.id}
            className="hidden"
            formError={errors.userId}
            {...register('userId')}
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
