'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Optional label text rendered above the input. */
  label?: string;
  /** Error message -- displays below the input when present. */
  error?: string;
  /** Hint text -- displays below the input (hidden when error is present). */
  hint?: string;
  /** Element rendered inside the input on the leading (left) side. */
  leadingIcon?: ReactNode;
  /** Element rendered inside the input on the trailing (right) side. */
  trailingIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leadingIcon, trailingIcon, className = '', id, ...props }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5 font-[family-name:var(--font-ibm)]">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-muted">
            {label}
          </label>
        )}

        <div className="relative">
          {leadingIcon && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted">
              {leadingIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              'w-full rounded-xl bg-surface border border-border',
              'text-sm text-text placeholder:text-text-muted/50',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-cyan/40 focus:border-cyan/50',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leadingIcon ? 'pl-10' : 'pl-4',
              trailingIcon ? 'pr-10' : 'pr-4',
              'py-2.5',
              error ? 'border-error/50 focus:ring-error/40 focus:border-error/50' : '',
              className,
            ].join(' ')}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />

          {trailingIcon && (
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted">
              {trailingIcon}
            </span>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="text-xs text-error" role="alert">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="text-xs text-text-muted">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
