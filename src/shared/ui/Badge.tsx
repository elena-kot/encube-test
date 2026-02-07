import type { ReactNode } from 'react';

type BadgeProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function Badge({ children, className = '' }: BadgeProps): ReactNode {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 ${className}`}
    >
      {children}
    </span>
  );
}
