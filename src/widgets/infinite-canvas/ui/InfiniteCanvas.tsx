import type { ReactNode } from 'react';

import { useCanvasInteraction } from '@/features/canvas-viewport';
import { CanvasElements } from '@/widgets/infinite-canvas/ui/CanvasElements';
import { CanvasGrid } from '@/widgets/infinite-canvas/ui/CanvasGrid';

/**
 * Self-contained infinite canvas widget.
 * Pure UI composition — all logic lives in hooks.
 */
export function InfiniteCanvas(): ReactNode {
  const { containerRef } = useCanvasInteraction();

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full cursor-grab overflow-hidden bg-white active:cursor-grabbing"
    >
      <CanvasGrid />
      <CanvasElements />
    </div>
  );
}
