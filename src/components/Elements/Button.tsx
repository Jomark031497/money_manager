import { classNames } from '@/utils/classNames';
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        className={classNames(
          'min-w-[100px] rounded border px-2 py-[0.30rem] text-sm font-bold tracking-wide shadow transition-all',
          className,
        )}
      >
        {children}
      </button>
    );
  },
);
