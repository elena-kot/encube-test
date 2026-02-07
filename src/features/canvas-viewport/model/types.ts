import type { Point } from '@/shared/types';

/**
 * Actions that control the canvas viewport (pan, zoom, reset).
 */
export type CanvasActions = {
  pan(delta: Point): void;
  zoom(center: Point, factor: number): void;
  resetView(): void;
};

/**
 * State of the canvas right-click context menu.
 */
export type ContextMenuState = {
  readonly screenPosition: Point;
  readonly canvasPosition: Point;
} | null;
