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
        'rounded-full border px-2 py-1 text-sm font-semibold  transition-all',
        primary
          ? 'border-primary bg-white text-primary hover:bg-primary hover:text-white'
          : 'border-secondary bg-white text-secondary hover:bg-secondary hover:text-white',
        className,
      )}
    >
      {children}
    </button>
  );
});
