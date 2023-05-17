import { classNames } from '@/utils/classNames';
import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  formError?: FieldError;
  className?: string;
  inputClassName?: string;
}

export const InputField = forwardRef<HTMLInputElement, Props>(
  ({ label, formError, className, inputClassName, ...rest }, ref) => {
    return (
      <div className={classNames('mb-4 flex flex-col', className)}>
        <label className={'block text-sm font-semibold text-gray-500'}>
          {label}
          <input
            {...rest}
            ref={ref}
            className={classNames(
              'mt-1 h-10 w-full appearance-none rounded border-2 px-2 py-[0.5rem] text-gray-500 shadow outline-none transition-all hover:border-primary focus:border-primary',
              formError ? 'border-red-500' : 'border-inherit',
              inputClassName,
            )}
          />
        </label>
        {formError && <p className="mt-1 px-1 text-sm text-red-500">{formError.message}</p>}
      </div>
    );
  },
);
