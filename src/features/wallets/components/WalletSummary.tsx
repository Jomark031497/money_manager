import { WalletCardSkeleton, useWalletsSummary } from '@/features/wallets';
import { toCurrency } from '@/utils/toCurrency';
import { Listbox, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { BiExpandVertical } from 'react-icons/bi';

const summaryOptions = ['This Month', 'This Year', 'Lifetime'];

interface SelectFieldProps {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

export const WalletSummary = ({ userId }: { userId: string }) => {
  const [selected, setSelected] = useState(summaryOptions[0]);
  const { data: summary } = useWalletsSummary({ userId });

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <p className="font-semibold text-gray-500">Summary</p>
        <SelectField selected={selected} setSelected={setSelected} />
      </div>
      {summary ? (
        <div className="grid h-[80px] grid-cols-3 items-center justify-evenly rounded-xl border bg-gray-50 p-2 shadow">
          <div className="col-span-1 flex flex-col items-center rounded p-2 text-red-600">
            <p className="text-xs font-semibold">Expenses</p>
            <p className="text-sm font-bold">{toCurrency(summary.totalExpenses)}</p>
          </div>

          <div className="col-span-1 flex flex-col items-center rounded p-2 text-green-600">
            <p className="text-xs font-semibold">Income</p>
            <p className="text-sm font-bold">{toCurrency(summary.totalIncome)}</p>
          </div>

          <div className="items col-span-1 flex flex-col items-center p-2">
            <p className="text-xs font-semibold">Balance</p>
            <p className="text-sm font-bold">{toCurrency(summary.totalBalance)}</p>
          </div>
        </div>
      ) : (
        <WalletCardSkeleton />
      )}
    </>
  );
};

const SelectField = ({ selected, setSelected }: SelectFieldProps) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-[130px] cursor-pointer rounded-full border border-secondary bg-white py-1 pl-3 pr-10 text-left text-secondary shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate text-sm font-semibold">{selected}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <BiExpandVertical className="h-5 w-5 text-secondary" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {summaryOptions.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 text-xs ${
                    active ? 'bg-secondary text-white' : 'text-gray-900'
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{person}</span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                        <AiOutlineCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
