import { Button } from '@/components/Elements/Button';
import { Dispatch, SetStateAction } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

interface Props<T> {
  count: number;
  setPagination: Dispatch<SetStateAction<T>>;
  pagination: T;
}

export const Pagination = <T extends Record<string, number>>({ pagination, count, setPagination }: Props<T>) => {
  const totalPages = Math.ceil(count / pagination.pageSize);
  const isPrevDisabled = pagination.pageIndex === 0;
  const isNextDisabled = pagination.pageIndex === totalPages - 1;

  return (
    <div className="flex justify-end gap-2">
      <Button
        aria-label="Previous"
        disabled={isPrevDisabled}
        onClick={() => setPagination({ ...pagination, pageIndex: pagination.pageIndex - 1 })}
        className={`${
          isPrevDisabled && 'border-gray-400 text-gray-400 hover:border-gray-400 hover:bg-white hover:text-gray-400'
        }`}
      >
        <BsChevronLeft className="text-lg" />
      </Button>
      <p>
        Page {pagination.pageIndex + 1} of {totalPages}
      </p>
      <Button
        aria-label="Next"
        disabled={isNextDisabled}
        onClick={() => setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 })}
        className={`${
          isNextDisabled && 'border-gray-400 text-gray-400 hover:border-gray-400 hover:bg-white hover:text-gray-400'
        }`}
      >
        <BsChevronRight className="text-lg" />
      </Button>
    </div>
  );
};
