import type { ReactNode } from 'react';

import { useUI } from '@/app/model/UIContext';
import { useCanvasInteraction } from '@/features/canvas-viewport/model/CanvasInteractionContext';

/**
 * Context menu triggered by right-clicking the canvas.
 * Positioned at the screen coordinates of the click.
 * 
 * Touch target: 44px min height (Apple HIG guideline).
 */
export function CanvasContextMenu(): ReactNode {
  const { setCommentsPanelOpen } = useUI();
  const { contextMenu, closeContextMenu } = useCanvasInteraction();

  if (!contextMenu) return null;

  const { screenPosition } = contextMenu;

  return (
    <div
      className="fixed z-50 min-w-[180px] rounded-lg border border-zinc-200 bg-white py-1 shadow-lg"
      style={{ left: screenPosition.x, top: screenPosition.y }}
      onMouseDown={(e): void => e.stopPropagation()}
      onPointerDown={(e): void => e.stopPropagation()}
    >
      <button
        type="button"
        className="flex h-11 w-full items-center gap-3 pl-4 pr-4 text-left text-base text-zinc-700 hover:bg-zinc-100"
        onClick={() => {
          // TODO: implement me.
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 flex-shrink-0 text-zinc-400">
          <path
            fillRule="evenodd"
            d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.232 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
            clipRule="evenodd"
          />
        </svg>
        <span>Add Comment</span>
      </button>
      <div className="mx-3 border-t border-zinc-100" />
      <button
        type="button"
        className="flex h-11 w-full items-center gap-3 pl-4 pr-4 text-left text-base text-zinc-700 hover:bg-zinc-100"
        onClick={(): void => {
          setCommentsPanelOpen(true);
          closeContextMenu();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 flex-shrink-0 text-zinc-400">
          <path d="M2 4.5A2.5 2.5 0 014.5 2h11A2.5 2.5 0 0118 4.5v8.75a.75.75 0 01-.75.75H5.414a1.5 1.5 0 00-1.06.44l-1.647 1.646A.75.75 0 011.5 15.56V5.75A1.25 1.25 0 012 4.5zm5.25 2a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5zm0 3a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" />
        </svg>
        <span>All Comments</span>
      </button>
    </div>
  );
}
