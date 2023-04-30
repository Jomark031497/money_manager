import { useState } from 'react';

interface Props {
  pageSize: number;
  pageIndex: number;
}

export const usePagination = ({ pageSize, pageIndex }: Props) => {
  const [pagination, setPagination] = useState({
    pageIndex: pageIndex,
    pageSize: pageSize,
  });

  return { pagination, setPagination };
};
