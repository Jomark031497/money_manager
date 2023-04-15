import { IUpdateWalletInputs, UpdateWalletSchema, updateWallet } from '@/features/wallets';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@/lib/client';
import { toast } from 'react-toastify';
import { Button, InputField, Modal, Spinner } from '@/components/Elements';
import { useSession } from 'next-auth/react';
import { Wallet } from '@prisma/client';

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
  } = useForm<IUpdateWalletInputs>({
    resolver: zodResolver(UpdateWalletSchema),
    defaultValues: { ...wallet },
  });

  const onSubmit: SubmitHandler<IUpdateWalletInputs> = async (values) => {
    try {
      await updateWallet(wallet.id, values);
      reset();
      queryClient.invalidateQueries(['wallet']);
      toast.success('Wallet updated successfully.');
      close();
    } catch (error) {
      toast.error('Wallet update failed.');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={close} title="Update Wallet" size="max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 p-4">
          <InputField
            label="Name *"
            placeholder="Acme Debit Card, X Digital Wallet"
            {...register('name')}
            formError={errors.name}
            className="col-span-3"
          />

          <InputField
            label="Description"
            placeholder="Payroll, Savings"
            {...register('description')}
            formError={errors.description}
            className="col-span-2"
          />

          {/* <InputField
            label="Initial Balance *"
            {...register('balance', {
              valueAsNumber: true,
            })}
            formError={errors.balance}
            className="col-span-2"
          /> */}

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
