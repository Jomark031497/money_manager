interface Props {
  count?: number;
}

const Skeleton = () => {
  return (
    <div className="my-auto grid h-[52px] animate-pulse grid-cols-4 rounded bg-gray-300 p-2">
      <div className="col-span-2 flex items-center gap-1">
        <div className="h-8 w-8 rounded-full bg-gray-700" />

        <div>
          <div className=" mb-2 h-2 w-36 rounded-full bg-gray-700" />
          <div className=" h-1.5 w-32 rounded-full bg-gray-700" />
        </div>
      </div>
      <div className="col-span-2 flex flex-col items-end justify-center">
        <div className="mb-2 h-1.5 w-32 rounded-full bg-gray-700"></div>
        <div className="h-2 w-24 rounded-full bg-gray-700"></div>
      </div>
    </div>
  );
};

export const WalletCardSkeletonContainer = ({ count = 1 }: Props) => {
  const skeletons = [];

  for (let i = 0; i < count; i++) {
    skeletons.push(<Skeleton key={i} />);
  }

  return (
    <>
      <div role="status" className="flex flex-col gap-1">
        {skeletons}
      </div>
    </>
  );
};
