/**
 * Raw API shapes for comments.
 * Decoupled from domain types so backend contract changes don't leak into the UI.
 */

export type CommentRaw = {
  readonly id: string;
  readonly thread_id: string; // null for top-level comment.
  readonly text: string;
  readonly created_by: number;
  readonly created_at: string;
};

export type CommentThreadRaw = {
  readonly id: string;
  readonly element_id: string | null;
  readonly x: number;
  readonly y: number;
  readonly created_by: number;
  readonly created_at: string;
  readonly resolved_by: number | null;
  readonly resolved_at: string | null;
  readonly comments: ReadonlyArray<CommentRaw>;
};