import { Transition, Dialog } from '@headlessui/react';
import { Fragment, ReactNode, useRef } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

interface Props {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, title, isOpen, onClose }: Props) => {
  const initialFocusRef = useRef(null);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => onClose()} initialFocus={initialFocusRef} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className={`w-full max-w-xs rounded bg-white md:max-w-sm`}>
              <div ref={initialFocusRef} className="relative rounded bg-gray-200 p-4 py-3">
                <Dialog.Title className="text-md font-semibold text-gray-500">{title}</Dialog.Title>

                <button
                  onClick={() => onClose()}
                  className="absolute right-2 top-2 text-2xl text-gray-500 transition-all hover:text-gray-800"
                >
                  <AiFillCloseCircle />
                </button>
              </div>

              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
