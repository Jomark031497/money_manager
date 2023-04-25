export const WalletCardSkeleton = () => {
  return (
    <div className="my-auto flex h-[92px] animate-pulse flex-col rounded-lg bg-gray-300 p-2">
      <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-700" />
      <div className="mb-4 h-2.5 w-40 rounded-full bg-gray-700" />
      <div className="mb-2 h-2.5 w-32 place-self-end rounded-full bg-gray-700" />
      <div className="mb-2 h-3 w-40 place-self-end rounded-full bg-gray-700" />
    </div>
  );
};
