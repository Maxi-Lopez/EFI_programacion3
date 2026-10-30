'use client';

import { forwardRef, useId } from 'react';

const Input = forwardRef(
  (
    {
      id: providedId,
      label,
      value,
      onChange,
      error,
      className = '',
      type = 'text',
      placeholder,
      disabled,
      required,
      leftIcon,
      rightIcon,
      helperText,
      autoComplete,
      name,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    return (
      <div className={`relative flex flex-col w-full ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="label-neon mb-2 block transition-colors duration-300 peer-focus-within:text-[var(--color-neon-green)]"
          >
            {label}
            {required && <span className="text-[var(--color-neon-pink)] ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative flex-1">
          {leftIcon && (
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] transition-colors duration-300 pointer-events-none peer-focus-within:text-[var(--color-neon-green)] z-10"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            autoComplete={autoComplete}
            name={name}
            placeholder={placeholder}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`
              input-neon w-full transition-all duration-300 min-h-[48px] py-3
              ${leftIcon ? 'pl-12 pr-4' : 'px-4'}
              ${rightIcon ? 'pr-12' : ''}
              ${error ? 'border-[var(--color-neon-pink)] focus:shadow-[0_0_0_3px_rgba(255,0,110,0.2),0_0_20px_var(--color-glow-pink)]' : ''}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            {...props}
          />
          {rightIcon && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] transition-colors duration-300 pointer-events-none peer-focus-within:text-[var(--color-neon-green)] z-10"
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p
            id={errorId}
            className="mt-2 text-sm text-[var(--color-neon-pink)] flex items-center gap-1.5 animate-in slide-in-from-top-2 duration-200"
            role="alert"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <div
            id={helperId}
            className="mt-2 text-sm text-[var(--color-text-dim)]"
          >
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;