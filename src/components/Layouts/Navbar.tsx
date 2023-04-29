import Link from 'next/link';
import { AiFillGold } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { signOut, useSession } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';

export const Navbar = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="mx-auto flex h-16 max-w-xl items-center justify-between bg-gray-100 p-2 px-4">
      <Link href="/" className="flex gap-1 text-lg font-semibold text-primary transition-all hover:text-primary-dark">
        <AiFillGold className="text-3xl" />
        Momney
      </Link>

      {sessionData && (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="flex items-center justify-center">
            <Image
              src={sessionData.user.image}
              alt="User Profile Image"
              height={50}
              width={50}
              priority
              className="rounded-full hover:opacity-50"
            />
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
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      className={`${
                        active ? 'bg-primary text-white' : 'text-gray-500'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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
