import type { ReactNode } from 'react';

type FilterButtonProps = {
  readonly active: boolean;
  readonly onClick: () => void;
  readonly children: ReactNode;
};

export function FilterButton({ active, onClick, children }: FilterButtonProps): ReactNode {
  return (
    <button
      type="button"
      className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
        active
          ? 'bg-white text-zinc-900 shadow-sm'
          : 'text-zinc-500 hover:text-zinc-700'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
