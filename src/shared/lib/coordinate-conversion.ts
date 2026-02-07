import type { Point, ViewportTransform } from '@/shared/types';

/**
 * Converts a screen-space (viewport) coordinate to a canvas-space coordinate.
 *
 * Formula:
 *   x_canvas = (x_screen - offset.x) / scale
 *   y_canvas = (y_screen - offset.y) / scale
 */
export function screenToCanvas(screenPoint: Point, transform: ViewportTransform): Point {
  return {
    x: (screenPoint.x - transform.offset.x) / transform.scale,
    y: (screenPoint.y - transform.offset.y) / transform.scale,
  };
}

/**
 * Converts a canvas-space coordinate to a screen-space (viewport) coordinate.
 *
 * Formula:
 *   x_screen = x_canvas * scale + offset.x
 *   y_screen = y_canvas * scale + offset.y
 */
export function canvasToScreen(canvasPoint: Point, transform: ViewportTransform): Point {
  return {
    x: canvasPoint.x * transform.scale + transform.offset.x,
    y: canvasPoint.y * transform.scale + transform.offset.y,
  };
}

/**
 * Computes the transformation matrix as a CSS transform string.
 * This is used to position the canvas layer within the viewport.
 */
export function transformToCssMatrix(transform: ViewportTransform): string {
  return `translate(${transform.offset.x}px, ${transform.offset.y}px) scale(${transform.scale})`;
}
