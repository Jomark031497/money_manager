import { Button } from '@/components/Elements/Button';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

interface Props {
  label: ReactNode;
  children: ReactNode;
}

export const DropdownMenu = ({ label, children }: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button as={Button} className="flex items-center gap-1">
        {label}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-1 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
