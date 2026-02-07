import { delay, http, HttpResponse } from 'msw';

import type { CommentApiContract } from '@/entities/comment/api/contract';
import type { CommentThreadRaw } from '@/entities/comment/api/types';

const MOCK_DELAY_MS = 300;

export const commentHandlers = {
  getAll: http.get('/api/comments', async () => {
    await delay(MOCK_DELAY_MS);

    const now = new Date().toISOString();
    const yesterday = new Date(Date.now() - 86_400_000).toISOString();
    const comments: ReadonlyArray<CommentThreadRaw> = [
      {
        id: 'c1',
        element_id: 'mcu-1',
        x: 160,
        y: 130,
        created_by: 1,
        created_at: yesterday,
        resolved_by: null,
        resolved_at: null,
        comments: [
          {
            id: 'c1-1', thread_id: 'c1', text: 'Should we use STM32H7 instead? More flash memory.', created_by: 1, created_at: yesterday,
          },
          {
            id: 'c1-2', thread_id: 'c1', text: 'Good point — H7 also has a better FPU.', created_by: 2, created_at: yesterday,
          },
          {
            id: 'c1-3', thread_id: 'c1', text: 'IMU placement needs to be closer to center of mass.', created_by: 2, created_at: yesterday,
          },
          {
            id: 'c1-4', thread_id: 'c1', text: 'Thermal pad verified — approved for production.', created_by: 1, created_at: now,
          }]
      },
      {
        id: 'c5',
        element_id: null,
        x: 640,
        y: 310,
        created_by: 2,
        created_at: yesterday,
        resolved_by: 1,
        resolved_at: now,
        comments: [ {
            id: 'c5-1', thread_id: 'c5', text: 'USB-C orientation: verify pin assignment with mfg.', created_by: 2, created_at: yesterday,
          },
          {
            id: 'c5-2', thread_id: 'c5', text: 'Fixed', created_by: 1, created_at: now,
          },
        ]
      },
    ];

    return HttpResponse.json(comments);
  }),
} as const satisfies CommentApiContract;
