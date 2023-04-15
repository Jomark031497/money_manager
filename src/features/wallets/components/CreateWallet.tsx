import { CreateWalletSchema, ICreateWalletInputs, createWallet } from '@/features/wallets';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@/lib/client';
import { toast } from 'react-toastify';
import { Button, InputField, Modal, Spinner } from '@/components/Elements';
import { useSession } from 'next-auth/react';

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
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<ICreateWalletInputs>({
    resolver: zodResolver(CreateWalletSchema),
    defaultValues: { balance: 0 },
  });

  const onSubmit: SubmitHandler<ICreateWalletInputs> = async (values) => {
    try {
      await createWallet(values);
      reset();
      queryClient.invalidateQueries(['wallets']);
      toast.success('Card created successfully.');
      close();
    } catch (error) {
      toast.error('Card creation failed.');
    }
  };

  const convertToNumber = (value: string) => {
    value = value.replace(/\D/g, ''); // Remove all non-digit characters

    return parseInt(value, 10); // Parse the value to a number
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={close} title="Create Wallet" size="max-w-sm">
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

          <InputField
            label="Initial Balance *"
            currency
            {...register('balance', {
              valueAsNumber: true,
            })}
            formError={errors.balance}
            className="col-span-2"
            onChange={(event) => {
              const value = convertToNumber(event.target.value);
              setValue('balance', value);
            }}
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
