import type { ButtonHTMLAttributes, ReactNode } from 'react';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly children: ReactNode;
  readonly label: string;
};

export function IconButton({ children, label, className = '', ...props }: IconButtonProps): ReactNode {
  return (
    <button
      aria-label={label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
