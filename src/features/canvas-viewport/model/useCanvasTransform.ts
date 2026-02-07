import { useCallback, useState } from 'react';

import type { Point, ViewportTransform } from '@/shared/types';
import { clamp } from '@/shared/lib';

import type { CanvasActions } from '@/features/canvas-viewport/model/types';
import { DEFAULT_TRANSFORM, MAX_SCALE, MIN_SCALE } from '@/features/canvas-viewport/model/constants';

type UseCanvasTransformResult = {
  readonly transform: ViewportTransform;
  readonly actions: CanvasActions;
};

/**
 * Manages the viewport's pan/zoom transformation state.
 * Keeps rendering logic (components) separate from state management (this hook).
 */
export function useCanvasTransform(): UseCanvasTransformResult {
  const [transform, setTransform] = useState<ViewportTransform>(DEFAULT_TRANSFORM);

  const pan = useCallback((delta: Point): void => {
    setTransform((prev) => ({
      ...prev,
      offset: {
        x: prev.offset.x + delta.x,
        y: prev.offset.y + delta.y,
      },
    }));
  }, []);

  const zoom = useCallback((center: Point, factor: number): void => {
    setTransform((prev) => {
      const newScale = clamp(prev.scale * factor, MIN_SCALE, MAX_SCALE);
      const ratio = newScale / prev.scale;

      // Zoom towards the cursor position:
      // Adjust offset so the canvas-point under the cursor stays fixed.
      return {
        scale: newScale,
        offset: {
          x: center.x - (center.x - prev.offset.x) * ratio,
          y: center.y - (center.y - prev.offset.y) * ratio,
        },
      };
    });
  }, []);

  const resetView = useCallback((): void => {
    setTransform(DEFAULT_TRANSFORM);
  }, []);

  return {
    transform,
    actions: { pan, zoom, resetView },
  };
}
