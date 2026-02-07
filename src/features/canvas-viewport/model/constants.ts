import type { ViewportTransform } from '@/shared/types';

/** Minimum zoom scale (10%) */
export const MIN_SCALE = 0.1;

/** Maximum zoom scale (500%) */
export const MAX_SCALE = 5.0;

/** How quickly the scroll wheel zooms */
export const ZOOM_SENSITIVITY = 0.001;

/** Default canvas transform (centered, 100% zoom) */
export const DEFAULT_TRANSFORM: ViewportTransform = {
  offset: { x: 0, y: 0 },
  scale: 1,
};
