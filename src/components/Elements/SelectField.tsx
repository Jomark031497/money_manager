import { classNames } from '@/utils/classNames';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { BiExpandVertical } from 'react-icons/bi';

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
        <label className={'relative block text-sm font-semibold text-gray-500'}>
          {label}
          <select
            {...rest}
            ref={ref}
            className={classNames(
              'mt-1 w-full appearance-none rounded border-2 bg-white p-2 px-3 leading-tight text-gray-500 shadow outline-none transition-all hover:border-primary focus:border-primary',
              formError ? 'border-red-500' : 'border-inherit',
            )}
          >
            {children}
          </select>
          <span className="pointer-events-none absolute inset-y-11 right-1 flex items-center">
            <BiExpandVertical className="h-4 w-4 text-xl text-gray-500" />
          </span>
        </label>
        {formError && <p className="mt-1 text-sm text-red-500">{formError.message}</p>}
      </div>
    );
  },
);
