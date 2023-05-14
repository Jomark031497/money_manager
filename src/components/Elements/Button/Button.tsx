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
        'rounded bg-secondary px-2 py-1 text-sm font-semibold text-white shadow transition-all hover:bg-secondary-light',
        className,
      )}
    >
      {children}
    </button>
  );
});
