import { classNames } from '@/utils/classNames';

interface Props {
  height?: string | number;
}

export const WalletCardSkeleton = ({ height = 80 }: Props) => {
  return (
    <div className={classNames('my-auto flex animate-pulse flex-col rounded-lg bg-gray-300 p-2', `h-[${height}px]`)}>
      <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-700" />
      <div className="mb-4 h-2.5 w-40 rounded-full bg-gray-700" />
      <div className="mb-2 h-2.5 w-32 place-self-end rounded-full bg-gray-700" />
      <div className="mb-2 h-3 w-40 place-self-end rounded-full bg-gray-700" />
    </div>
  );
};
