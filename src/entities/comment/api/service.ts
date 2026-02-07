import { apiClient } from '@/shared/api';

import type { CommentThread } from '../model/types';

import type { CommentApiContract } from './contract';
import { commentMapper } from './mapper';
import type { CommentThreadRaw } from './types';

const BASE_PATH = '/comments';

export const commentService = {
    async getAll(): Promise<ReadonlyArray<CommentThread>> {
        const raw = await apiClient.get<ReadonlyArray<CommentThreadRaw>>(BASE_PATH);
    
        return commentMapper.getAll(raw);
      },
} as const satisfies CommentApiContract;
