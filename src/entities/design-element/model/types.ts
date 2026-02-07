import type { Point } from '@/shared/types';

export type DesignElement = {
  readonly id: string;
  readonly position: Point; // Canvas coordinates.
  readonly width: number;
  readonly height: number;
  readonly label: string;
  readonly createdBy: number; // User id.
  readonly lastUpdatedBy: number; // User id.
  readonly createdAt: Date;
  readonly lastUpdatedAt: Date;
};
