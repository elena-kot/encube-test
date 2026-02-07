import type { ReactNode } from 'react';

import { useComments, CommentFilterValues } from '@/features/comment';

import { FilterButton } from './FilterButton';

export function CommentFilter(): ReactNode {
  const { filter, setFilter } = useComments();

  return (
    <div className="flex gap-1 rounded-lg bg-zinc-100 p-1">
      <FilterButton active={filter === CommentFilterValues.Open} onClick={(): void => setFilter(CommentFilterValues.Open)}>
        Open
      </FilterButton>
      <FilterButton active={filter === CommentFilterValues.Resolved} onClick={(): void => setFilter(CommentFilterValues.Resolved)}>
        Resolved
      </FilterButton>
    </div>
  );
}
