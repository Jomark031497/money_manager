import { Modal, Button, Spinner } from '@/components/Elements';
import { ITransactionWithWallet, deleteTransaction } from '@/features/transactions';
import { queryClient } from '@/lib/client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { toast } from 'react-toastify';

interface Props {
  isOpen: boolean;
  close: () => void;
  transaction: ITransactionWithWallet;
}

export const DeleteTransaction = ({ isOpen, close, transaction }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
      close();
      router.push('/');
      toast.success('Transaction deleted successfully', { delay: 500 });
    },
  });

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      mutation.mutate(transaction.id);
    } catch (error) {
      return toast.error('Transaction Delete Failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={close} title="Delete Transaction">
        <div className="grid grid-cols-3 gap-2 p-4">
          <p className="col-span-3 font-semibold italic">Are you sure you want to delete:</p>

          <div className="col-span-3 grid grid-cols-3 text-sm">
            <p className="col-span-1">Name:</p>
            <p className="col-span-2 font-semibold">{transaction.name}</p>
          </div>

          <div className="col-span-3 grid grid-cols-3 text-sm">
            <p className="col-span-1">Description:</p>
            <p className="col-span-2 font-semibold">{transaction.description}</p>
          </div>

          <div className="col-span-3 grid grid-cols-3 text-sm">
            <p className="col-span-1">Amount:</p>
            <p className="col-span-2 font-semibold">{transaction.amount}</p>
          </div>

          <div className="col-span-3 grid grid-cols-3 text-sm">
            <p className="col-span-1">Wallet:</p>
            <p className="col-span-2 font-semibold">{transaction.wallet.name}</p>
          </div>

          <div className="col-span-3 my-4 flex items-center gap-2 rounded-md bg-red-100 p-2 text-sm font-semibold text-red-500">
            <AiOutlineWarning className="text-4xl" />
            <p>This action cannot be undone. Do you wish to continue and delete?</p>
          </div>

          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="col-span-3 flex items-center justify-center gap-2 border-red-500 py-2 text-red-500 hover:border-red-700 hover:text-red-700"
          >
            {isLoading ? <Spinner /> : 'Delete'}
          </Button>
        </div>
      </Modal>
    </>
  );
};
