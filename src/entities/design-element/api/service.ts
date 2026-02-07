import { apiClient } from '@/shared/api';

import type { DesignElement } from '../model/types';

import type { DesignElementApiContract } from './contract';
import { designElementMapper } from './mapper';
import type { DesignElementRaw } from './types';

const BASE_PATH = '/design-elements';

/**
 * Design element API service.
 *
 * All methods return domain data — never raw API shapes.
 */
export const designElementService = {
  async getAll(): Promise<ReadonlyArray<DesignElement>> {
    const raw = await apiClient.get<ReadonlyArray<DesignElementRaw>>(BASE_PATH);

    return designElementMapper.getAll(raw);
  },
} as const satisfies DesignElementApiContract;
