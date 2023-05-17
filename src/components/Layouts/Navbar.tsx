import { FiLogOut } from 'react-icons/fi';
import { signOut, useSession } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { classNames } from '@/utils/classNames';
import Link from 'next/link';
import { BiMenuAltRight } from 'react-icons/bi';

export const Navbar = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="mx-auto flex h-16 max-w-md items-center justify-between bg-white p-2 px-4 shadow">
      <Link href="/" className="relative text-lg tracking-tighter">
        <span className="font-normal">money</span>
        <span className="font-semibold text-primary">trackr</span>
        <sup className="absolute top-0 ml-1 text-xs font-normal">[beta]</sup>
      </Link>

      {sessionData && (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="flex items-center justify-center text-3xl text-gray-500">
            <BiMenuAltRight />
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
            <Menu.Items className="absolute right-0 z-10 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      className={classNames(
                        'flex w-full items-center px-2 py-2 text-sm font-semibold transition-all',
                        active ? 'bg-orange-100 text-secondary' : 'text-gray-400',
                      )}
                    >
                      <FiLogOut className="mr-1 text-lg" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </header>
  );
};
