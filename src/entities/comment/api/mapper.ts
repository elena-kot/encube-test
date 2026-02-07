import type { CommentThread } from '../model/types';

import type { CommentApiContract } from './contract';
import type { CommentThreadRaw } from './types';

export const commentMapper = {
    getAll(raw: ReadonlyArray<CommentThreadRaw>): ReadonlyArray<CommentThread> {
        return raw.map(item => ({
            ...item,
            elementId: item.element_id,
            position: { x: item.x, y: item.y },
            createdAt: new Date(item.created_at),
            resolvedAt: item.resolved_at ? new Date(item.resolved_at) : null,
            createdBy: item.created_by,
            resolvedBy: item.resolved_by,
            comments: item.comments.map(comment => ({
                ...comment,
                threadId: comment.thread_id,
                createdBy: comment.created_by,
                createdAt: new Date(comment.created_at),
            })),
        }));
    },
} as const satisfies CommentApiContract;
