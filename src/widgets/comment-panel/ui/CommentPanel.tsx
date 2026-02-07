import type { ReactNode } from 'react';

import { useUI } from '@/app/model/UIContext';
import { CommentFilter } from '@/features/comment';
import { CommentList } from '@/features/comment/ui/CommentList';

export function CommentPanel(): ReactNode {
  const { isCommentsPanelOpen, setCommentsPanelOpen } = useUI();

  if (!isCommentsPanelOpen) return null;

  return (
    <div className="absolute bottom-0 right-0 top-0 flex h-full w-80 flex-col border-l border-zinc-200 bg-zinc-50">
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-zinc-900">Comments</h2>
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600"
          onClick={() => setCommentsPanelOpen(false)}
          aria-label="Close panel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
      <div className="px-4 pt-3">
        <CommentFilter />
      </div>
      <CommentList />
    </div>
  );
}
