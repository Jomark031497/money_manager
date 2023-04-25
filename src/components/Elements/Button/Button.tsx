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
        'rounded-full border px-2 py-1 text-sm font-semibold transition-all',
        primary
          ? 'border-primary text-primary hover:border-primary-dark hover:text-primary-dark'
          : 'bg:text-secondary border-secondary text-secondary hover:border-transparent hover:bg-secondary hover:text-white',
        className,
      )}
    >
      {children}
    </button>
  );
});
