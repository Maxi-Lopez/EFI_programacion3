'use client';

import { useEffect } from 'react';

export default function Input({ id, label, value, onChange, error, className = '', ...props }) {
  useEffect(() => {}, []);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-slate-800 transition-colors ${
          error ? 'border-red-500' : 'border-slate-300'
        }`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 block">{error}</span>
      )}
    </div>
  );
}
