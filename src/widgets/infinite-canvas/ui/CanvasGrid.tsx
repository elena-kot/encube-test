import type { ReactNode } from 'react';

import { useCanvasInteraction } from '@/features/canvas-viewport/model/CanvasInteractionContext';

/**
 * Renders an infinite dot grid that moves with the viewport.
 * Uses an SVG pattern for GPU-friendly repeating tiles.
 */
export function CanvasGrid(): ReactNode {
  const { canvasTransform } = useCanvasInteraction();
  const gridSize = 24;
  const scaledGrid = gridSize * canvasTransform.scale;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="canvas-grid"
          x={canvasTransform.offset.x % scaledGrid}
          y={canvasTransform.offset.y % scaledGrid}
          width={scaledGrid}
          height={scaledGrid}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={scaledGrid / 2}
            cy={scaledGrid / 2}
            r={1}
            fill="rgba(0, 0, 0, 0.08)"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#canvas-grid)" />
    </svg>
  );
}
