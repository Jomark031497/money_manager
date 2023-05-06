export const TransactionCardSkeleton = () => {
  return (
    <div className="grid h-[64px] animate-pulse grid-cols-3 gap-1 rounded-lg bg-gray-300 p-2">
      <div className="col-span-2 h-3 w-52 rounded-full bg-gray-700" />
      <div className="col-span-1 h-2 w-40 justify-self-end rounded-full bg-gray-700" />
      <div className="col-span-2 h-2 w-44 rounded-full bg-gray-700" />
      <div className="col-span-1 h-1.5 w-40 justify-self-end rounded-full bg-gray-700" />
      <div className="col-span-2 h-1.5 w-44 rounded-full bg-gray-700" />
      <div className="col-span-2 h-1.5 w-44 rounded-full bg-gray-700" />
    </div>
  );
};
