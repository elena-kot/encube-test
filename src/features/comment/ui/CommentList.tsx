import { type ReactNode, useMemo } from 'react';

import { CommentFilterValues } from '../model/types';
import { useComments } from '../model/CommentsContext';

function formatRelativeTime(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function getUserName(userId: number): string {
  const names: Record<number, string> = { 1: 'Elena', 2: 'Alex' };
  return names[userId] ?? `User ${userId}`;
}

/**
 * Renders a flat list of top-level comment threads with their replies.
 */
export function CommentList(): ReactNode {
  const { commentThreads, isLoading, filter } = useComments();
  const filteredCommentThreads = useMemo(
    () => commentThreads.filter((tr) =>
      filter === CommentFilterValues.Resolved ? !!tr.resolvedBy : !tr.resolvedBy,
    ),
    [commentThreads, filter],
  );

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-zinc-400">
        Loading comments...
      </div>
    );
  }
  
  if (!commentThreads.length) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-zinc-400">
        No comments yet
      </div>
    );
  }

  // TODO: add virtualized list.
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
      {filteredCommentThreads.map((commentThread) => {
        const [comment, ...replies] = commentThread.comments;

        return (
          <div
            key={commentThread.id}
            className="rounded-lg border border-zinc-200 bg-white p-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-900">
                {getUserName(commentThread.createdBy)}
              </span>
              <span className="text-xs text-zinc-400">
                {formatRelativeTime(commentThread.createdAt)}
              </span>
            </div>
            <p className="mt-1 text-sm text-zinc-600">{comment.text}</p>
            {commentThread.resolvedBy ? (
              <span className="mt-2 mb-4 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                Resolved
              </span>
            ) : (
              <button className="mb-5 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 my-3 rounded-full">
                Resolve
              </button>
            )}
            {replies.length ? (
              <div className="flex flex-col gap-4 border-l-2 border-zinc-100 pl-3">
                {replies.map((reply) => (
                  <div key={reply.id}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-zinc-900">
                        {getUserName(reply.createdBy)}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {formatRelativeTime(reply.createdAt)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-zinc-600">{reply.text}</p>
                  </div>
                ))}
              </div>
            ) : null}
            {!commentThread.resolvedBy ? (
              <textarea
                rows={2}
                className="mt-5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                placeholder="Reply"
              ></textarea>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
