import { delay, http, HttpResponse } from 'msw';

import type { DesignElementApiContract } from '@/entities/design-element/api/contract';
import type { DesignElementRaw } from '@/entities/design-element/api/types';

export const designElementHandlers = {
  getAll: http.get('/api/design-elements', async () => {
    const now = new Date().toISOString();
    const delayMs = 400;

    await delay(delayMs);

    return HttpResponse.json<ReadonlyArray<DesignElementRaw>>([
      { id: 'mcu-1', x: 100, y: 100, width: 180, height: 120, label: 'MCU — STM32F4', created_by: 1, last_updated_by: 1, created_at: now, last_updated_at: now },
      { id: 'sensor-1', x: 400, y: 80, width: 160, height: 100, label: 'IMU — MPU6050', created_by: 1, last_updated_by: 1, created_at: now, last_updated_at: now },
      { id: 'psu-1', x: 250, y: 320, width: 200, height: 100, label: 'PSU — 5V/3A', created_by: 1, last_updated_by: 1, created_at: now, last_updated_at: now },
      { id: 'connector-1', x: 600, y: 280, width: 140, height: 80, label: 'USB-C Port', created_by: 1, last_updated_by: 1, created_at: now, last_updated_at: now },
      { id: 'radio-1', x: 100, y: 320, width: 180, height: 100, label: 'RF — nRF52840', created_by: 1, last_updated_by: 1, created_at: now, last_updated_at: now },
    ]);
  }),
} as const satisfies DesignElementApiContract;
