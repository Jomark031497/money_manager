import { classNames } from '@/utils/classNames';
import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  formError?: FieldError;
  className?: string;
  currency?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, Props>(
  ({ label, formError, className, currency, ...rest }, ref) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      if (currency) {
        value = value.replace(/\D/g, ''); // Remove all non-digit characters
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add comma for every thousands
      }
      rest.onChange && rest.onChange(event);
      event.target.value = value;
    };

    return (
      <div className={classNames('mb-4 flex flex-col', className)}>
        <label className={'block text-sm font-semibold text-gray-500'}>
          {label}
          <input
            {...rest}
            ref={ref}
            className={classNames(
              'mt-1 w-full appearance-none rounded border-2 p-2 px-3 leading-tight text-gray-500 shadow outline-none transition-all hover:border-primary focus:border-primary',
              formError ? 'border-red-500' : 'border-inherit',
            )}
            onChange={onChange}
          />
        </label>
        {formError && <p className="mt-1 px-1 text-sm text-red-500">{formError.message}</p>}
      </div>
    );
  },
);
