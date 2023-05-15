import { IWalletInputs, WalletSchema, updateWallet } from '@/features/wallets';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@/lib/queryClient';
import { toast } from 'react-toastify';
import { Button, InputField, Modal, Spinner } from '@/components/Elements';
import { useSession } from 'next-auth/react';
import { Wallet } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';

interface Props {
  isOpen: boolean;
  close: () => void;
  wallet: Wallet;
}

export const UpdateWallet = ({ isOpen, close, wallet }: Props) => {
  const { data: sessionData } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<Partial<IWalletInputs['body']>>({
    resolver: zodResolver(WalletSchema.shape.body.partial()),
    defaultValues: { ...wallet },
  });

  const mutation = useMutation({
    mutationFn: (values: Partial<IWalletInputs['body']>) => updateWallet(wallet.id, values),
    onSuccess: () => {
      queryClient.invalidateQueries(['wallet']);
      reset();
      close();
      toast.success('Wallet updated successfully.', { delay: 500 });
    },
  });

  const onSubmit: SubmitHandler<Partial<IWalletInputs['body']>> = async (values) => {
    try {
      mutation.mutate(values);
    } catch (error) {
      toast.error('Wallet update failed.');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={close} title="Update Wallet">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 p-4">
          <InputField label="Wallet Emoji *" {...register('emoji')} formError={errors.emoji} className="col-span-3" />

          <InputField
            label="Wallet Name *"
            placeholder="Acme Debit Card, X Digital Wallet"
            {...register('name')}
            formError={errors.name}
            className="col-span-3"
          />

          <InputField
            label="Description *"
            placeholder="Payroll, Savings"
            {...register('description')}
            formError={errors.description}
            className="col-span-2"
          />

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
    </>
  );
};
