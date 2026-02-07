import type { ReactNode } from 'react';

import { transformToCssMatrix } from '@/shared/lib';

import { DesignElementCanvas, useDesignElements } from '@/entities/design-element';
import { useCanvasInteraction } from '@/features/canvas-viewport/model/CanvasInteractionContext';
/**
 * The transformed layer that holds all canvas elements.
 * Applies the viewport transform via CSS for smooth rendering.
 */
export function CanvasElements(): ReactNode {
  const { elements, isLoading } = useDesignElements();
  const { canvasTransform } = useCanvasInteraction();

  if (isLoading) return (
    <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">Loading elements...</div>
  );

  return (
    <div
      className="absolute origin-top-left"
      style={{ transform: transformToCssMatrix(canvasTransform) }}
    >
      {elements.map((element) => (
        <DesignElementCanvas key={element.id} element={element} />
      ))}
    </div>
  );
}
