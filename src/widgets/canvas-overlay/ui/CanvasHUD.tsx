import type { ReactNode } from 'react';

import { Badge, IconButton } from '@/shared/ui';

import { useCanvasInteraction } from '@/features/canvas-viewport/model/CanvasInteractionContext';

/**
 * Heads-up display overlay showing zoom level and viewport controls.
 * Stays fixed in screen-space regardless of canvas position.
 */
export function CanvasHUD(): ReactNode {
  const { canvasActions, canvasTransform } = useCanvasInteraction();
  const zoomPercent = Math.round(canvasTransform.scale * 100);

  return (
    <div className="absolute bottom-4 left-4 flex items-center gap-2">
      <Badge>{zoomPercent}%</Badge>

      <IconButton
        label="Zoom in"
        onClick={(): void => canvasActions.zoom({ x: window.innerWidth / 2, y: window.innerHeight / 2 }, 1.2)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
        </svg>
      </IconButton>

      <IconButton
        label="Zoom out"
        onClick={(): void => canvasActions.zoom({ x: window.innerWidth / 2, y: window.innerHeight / 2 }, 0.8)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
        </svg>
      </IconButton>

      <IconButton label="Reset view" onClick={canvasActions.resetView}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h11.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0115.75 17H4.25A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
        </svg>
      </IconButton>
    </div>
  );
}
