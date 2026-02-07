import type { ReactNode } from 'react';

import { InfiniteCanvas } from '@/widgets/infinite-canvas';
import { UIProvider } from '@/app/model/UIContext';
import { CanvasInteractionProvider } from '@/features/canvas-viewport/model/CanvasInteractionContext';
import { CanvasOverlay } from '@/widgets/canvas-overlay';

export function App(): ReactNode {
  return (
    <UIProvider>
      <CanvasInteractionProvider>
        <InfiniteCanvas />
        <CanvasOverlay />
      </CanvasInteractionProvider>
    </UIProvider>
  );
}
