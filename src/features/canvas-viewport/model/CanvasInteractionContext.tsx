import type { ReactNode, RefObject } from 'react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import type { ViewportTransform } from '@/shared/types';
import { screenToCanvas } from '@/shared/lib';

import type { CanvasActions, ContextMenuState } from '@/features/canvas-viewport/model/types';
import { ZOOM_SENSITIVITY } from '@/features/canvas-viewport/model/constants';
import { useCanvasTransform } from '@/features/canvas-viewport/model/useCanvasTransform';

type CanvasInteractionContextValue = {
  readonly containerRef: RefObject<HTMLDivElement | null>;
  readonly contextMenu: ContextMenuState;
  readonly closeContextMenu: () => void;
  readonly canvasTransform: ViewportTransform;
  readonly canvasActions: CanvasActions;
};

const CanvasInteractionContext = createContext<CanvasInteractionContextValue | undefined>(undefined);

export function CanvasInteractionProvider({ children }: {
  readonly children: ReactNode;
}): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPanning = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);
  const { transform, actions } = useCanvasTransform();
  // Keep transform in a ref so the contextmenu handler always reads the latest value
  // without re-registering the native event listener on every transform change.
  const transformRef = useRef(transform);
  transformRef.current = transform;

  const closeContextMenu = useCallback((): void => {
    setContextMenu(null);
  }, []);

  const handleWheel = useCallback(
    (event: WheelEvent): void => {
      event.preventDefault();

      if (event.ctrlKey || event.metaKey) {
        const factor = 1 - event.deltaY * ZOOM_SENSITIVITY;
        actions.zoom({ x: event.clientX, y: event.clientY }, factor);
      } else {
        actions.pan({ x: -event.deltaX, y: -event.deltaY });
      }
    },
    [actions],
  );

  const handlePointerDown = useCallback((event: PointerEvent): void => {
    if (event.button === 0 || event.button === 1) {
      isPanning.current = true;
      lastPointer.current = { x: event.clientX, y: event.clientY };
      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
      event.preventDefault();
    }
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent): void => {
      if (!isPanning.current) return;

      const delta = {
        x: event.clientX - lastPointer.current.x,
        y: event.clientY - lastPointer.current.y,
      };

      lastPointer.current = { x: event.clientX, y: event.clientY };
      actions.pan(delta);
    },
    [actions],
  );

  const handlePointerUp = useCallback((): void => {
    isPanning.current = false;
  }, []);

  const handleContextMenu = useCallback((event: MouseEvent): void => {
    event.preventDefault();

    const screenPosition = { x: event.clientX, y: event.clientY };
    const canvasPosition = screenToCanvas(screenPosition, transformRef.current);

    setContextMenu({ screenPosition, canvasPosition });
  }, []);

  // Attach all native DOM event listeners to the container.
  useEffect(() => {
    const canvas = containerRef.current;

    if (!canvas) return;

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('contextmenu', handleContextMenu);

    return (): void => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('contextmenu', handleContextMenu);
    };
  },  [handleWheel, handlePointerDown, handlePointerMove, handlePointerUp, handleContextMenu]);

  // Dismiss context menu on click, scroll, or Escape.
  useEffect(() => {
    if (!contextMenu) return;

    const handleDismiss = (): void => setContextMenu(null);
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') handleDismiss();
    };

    window.addEventListener('click', handleDismiss);
    window.addEventListener('scroll', handleDismiss, true);
    window.addEventListener('keydown', handleKeyDown);

    return (): void => {
      window.removeEventListener('click', handleDismiss);
      window.removeEventListener('scroll', handleDismiss, true);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [contextMenu]);

  return (
    <CanvasInteractionContext.Provider value={{
      containerRef,
      contextMenu,
      closeContextMenu,
      canvasTransform: transform,
      canvasActions: actions,
    }}>
      {children}
    </CanvasInteractionContext.Provider>
  );
}

export function useCanvasInteraction(): CanvasInteractionContextValue {
  const canvasInteractionContext = useContext(CanvasInteractionContext);

  if (!canvasInteractionContext) {
    throw new Error('useCanvasInteraction must be used within CanvasInteractionProvider');
  }

  return canvasInteractionContext;
}
