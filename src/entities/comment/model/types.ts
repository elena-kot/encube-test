import type { Point } from '@/shared/types';

export type Comment = {
  readonly id: string;
  readonly threadId: string;
  readonly text: string;
  readonly createdBy: number;
  readonly createdAt: Date;
};

export type CommentThread = {
  readonly id: string;
  readonly elementId: string | null;
  readonly position: Point; // Canvas coordinates.
  readonly createdBy: number; // User id.
  readonly createdAt: Date;
  readonly resolvedBy: number | null; // User id.
  readonly resolvedAt: Date | null;
  readonly comments: ReadonlyArray<Comment>;
};
