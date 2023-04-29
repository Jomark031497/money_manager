import { classNames } from '@/utils/classNames';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  formError?: FieldError;
  className?: string;
  children: ReactNode;
}

export const SelectField = forwardRef<HTMLSelectElement, Props>(
  ({ label, formError, className, children, ...rest }, ref) => {
    return (
      <div className={classNames('mb-4 flex flex-col', className)}>
        <label className={'block text-sm font-semibold text-gray-500'}>
          {label}
          <select
            {...rest}
            ref={ref}
            className={classNames(
              'mt-1 w-full rounded border-2 bg-white p-2 px-3 leading-tight text-gray-500 shadow outline-none transition-all hover:border-primary focus:border-primary',
              formError ? 'border-red-500' : 'border-inherit',
            )}
          >
            {children}
          </select>
        </label>
        {formError && <p className="mt-1 text-sm text-red-500">{formError.message}</p>}
      </div>
    );
  },
);
