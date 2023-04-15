import { Modal, Button, Spinner } from '@/components/Elements';
import { deleteWallet } from '@/features/wallets';
import { queryClient } from '@/lib/client';
import { Wallet } from '@prisma/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { toast } from 'react-toastify';

interface Props {
  isOpen: boolean;
  close: () => void;
  wallet: Wallet;
}

export const DeleteWallet = ({ isOpen, close, wallet }: Props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await deleteWallet(wallet.id);
      queryClient.invalidateQueries(['wallets']);
      toast.success('Wallet deleted successfully');
      close();
      router.push('/');
    } catch (error) {
      return toast.error('Wallet Delete Failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={close} title="Delete Wallet" size="max-w-sm">
        <div className="grid grid-cols-3 gap-2 p-4">
          <p className="col-span-3 font-semibold italic">Are you sure you want to delete:</p>

          <div className="col-span-3 grid grid-cols-3 text-sm">
            <p className="col-span-1">Name:</p>
            <p className="col-span-2 font-semibold">{wallet.name}</p>
          </div>

          <div className="col-span-3 grid grid-cols-3 text-sm">
            <p className="col-span-1">Description:</p>
            <p className="col-span-2 font-semibold">{wallet.description}</p>
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
