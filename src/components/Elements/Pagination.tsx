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
    <div className="flex items-center justify-end gap-2">
      <button
        aria-label="Previous"
        disabled={isPrevDisabled}
        onClick={() => setPagination({ ...pagination, pageIndex: pagination.pageIndex - 1 })}
        className={`${
          isPrevDisabled
            ? 'text-gray-400'
            : 'rounded-full border border-transparent p-1 text-secondary transition-all hover:border-secondary'
        }`}
      >
        <BsChevronLeft className="text-lg" />
      </button>
      <p className="text-gray-500">
        Page {pagination.pageIndex + 1} of {totalPages}
      </p>
      <button
        aria-label="Next"
        disabled={isNextDisabled}
        onClick={() => setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 })}
        className={`${
          isNextDisabled
            ? 'text-gray-400'
            : 'rounded-full border border-transparent p-1 text-secondary transition-all hover:border-secondary'
        }`}
      >
        <BsChevronRight className="text-lg" />
      </button>
    </div>
  );
};
