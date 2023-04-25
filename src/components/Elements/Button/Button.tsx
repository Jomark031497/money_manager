import { classNames } from '@/utils/classNames';
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  primary?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(({ children, primary = false, className, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      {...rest}
      className={classNames(
        'rounded-lg border px-4 py-1 text-sm font-semibold transition-all',
        primary
          ? 'border-primary text-primary hover:border-primary-dark hover:text-primary-dark'
          : 'border-secondary text-secondary hover:border-secondary-light hover:text-secondary-light',
        className,
      )}
    >
      {children}
    </button>
  );
});
