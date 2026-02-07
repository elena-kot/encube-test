import type { ReactNode } from 'react';

import { CommentsProvider } from '@/features/comment';

import { CommentPanel } from '../../comment-panel';

import { CanvasHUD } from './CanvasHUD';
import { CanvasContextMenu } from './CanvasContextMenu';

export function CanvasOverlay(): ReactNode {
  return (
    <>
      <CommentsProvider>
        <CommentPanel />
      </CommentsProvider>
      <CanvasHUD />
      <CanvasContextMenu />
    </>
  );
}

