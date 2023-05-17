import { IWalletInputs, WalletSchema, createWallet } from '@/features/wallets';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@/lib/queryClient';
import { toast } from 'react-toastify';
import { Button, InputField, Modal, Spinner } from '@/components/Elements';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import Picker from '@emoji-mart/react';

interface Props {
  isOpen: boolean;
  close: () => void;
  userId: string;
}

export const CreateWallet = ({ isOpen, close, userId }: Props) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { isSubmitting, errors },
  } = useForm<IWalletInputs['body']>({
    resolver: zodResolver(WalletSchema.shape.body),
    defaultValues: { balance: 0, emoji: '👛' },
  });

  const emojiValue = watch('emoji');

  const mutation = useMutation({
    mutationFn: (payload: IWalletInputs['body']) => createWallet(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['wallets']);
      queryClient.invalidateQueries(['transactions']);
      reset();
      close();
      toast.success('Card Added.');
    },
  });

  const togglePicker = () => setPickerVisible((prev) => !prev);

  const onSubmit: SubmitHandler<IWalletInputs['body']> = async (values) => {
    try {
      mutation.mutateAsync(values);
    } catch (error) {
      toast.error('Card creation failed.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Create Wallet">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 p-4">
        <div className="relative col-span-4 flex items-center gap-1">
          <InputField
            label="Wallet Name *"
            placeholder="Acme Debit Card, X Digital Wallet"
            formError={errors.name}
            {...register('name')}
            inputClassName="pl-10"
          />
          <button
            type="button"
            onClick={togglePicker}
            className="absolute left-1 top-7 h-8 w-8 text-2xl"
          >
            {emojiValue}
          </button>
          {isPickerVisible && (
            <div className="absolute">
              <Controller
                control={control}
                name="emoji"
                render={({ field }) => (
                  <Picker
                    emojiSize={24}
                    onClickOutside={togglePicker}
                    onEmojiSelect={({ native }: { native: string }) => {
                      field.onChange(native);
                      togglePicker();
                    }}
                  />
                )}
              />
            </div>
          )}
        </div>

        <InputField
          label="Description"
          placeholder="Payroll, Savings, Credit Card"
          formError={errors.description}
          className="col-span-3"
          {...register('description')}
        />

        <InputField
          label="Initial Balance *"
          className="col-span-3"
          formError={errors.balance}
          {...register('balance', {
            valueAsNumber: true,
          })}
        />
        <InputField
          label="User ID"
          defaultValue={userId}
          className="hidden"
          formError={errors.userId}
          {...register('userId')}
        />

        <div className="col-span-2 flex gap-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="border-secondary text-secondary hover:bg-secondary hover:text-white"
          >
            {isSubmitting ? <Spinner /> : 'Create'}
          </Button>
          <Button onClick={close} className="grow border-gray-300 py-2 text-gray-500">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
