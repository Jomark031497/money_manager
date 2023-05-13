import { classNames } from '@/utils/classNames';
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, Props>(({ children, className, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      {...rest}
      className={classNames(
        'rounded border px-2 py-1 text-sm font-semibold text-gray-500 shadow transition-all hover:bg-gray-200 hover:text-gray-600',
        className,
      )}
    >
      {children}
    </button>
  );
});
