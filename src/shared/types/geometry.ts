/**
 * A 2D point in any coordinate space.
 */
export type Point = {
  readonly x: number;
  readonly y: number;
};

/**
 * The viewport's current transformation state.
 * Encodes pan (offset) and zoom (scale) as an affine transform:
 *
 *   x_canvas = (x_screen - offset.x) / scale
 *   y_canvas = (y_screen - offset.y) / scale
 */
export type ViewportTransform = {
  readonly offset: Point;
  readonly scale: number;
};

/**
 * An axis-aligned bounding box in canvas coordinates.
 */
export type BoundingBox = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};
