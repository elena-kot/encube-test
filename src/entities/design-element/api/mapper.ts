import type { DesignElement } from '@/entities/design-element/model/types';

import type { DesignElementApiContract } from './contract';
import type { DesignElementRaw } from './types';

/**
 * Maps raw API shapes to domain DesignElement.
 * Method names mirror designElementService for easy tracing.
 */
export const designElementMapper = {
  getAll(raw: ReadonlyArray<DesignElementRaw>): ReadonlyArray<DesignElement> {
    return raw.map(item => ({
        ...item,
        position: { x: item.x, y: item.y },
        createdBy: item.created_by,
        lastUpdatedBy: item.last_updated_by,
        createdAt: new Date(item.created_at),
        lastUpdatedAt: new Date(item.last_updated_at),
    }));
  },
} as const satisfies DesignElementApiContract;
