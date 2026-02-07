import type { ReactNode } from 'react';

import type { DesignElement } from '@/entities/design-element/model/types';

type DesignElementCanvasProps = {
  readonly element: DesignElement;
};

export function DesignElementCanvas({ element }: DesignElementCanvasProps): ReactNode {
  return (
    <div
      className="absolute flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm text-zinc-800 shadow-md backdrop-blur-sm transition-shadow hover:border-zinc-400 hover:shadow-lg"
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.width,
        height: element.height,
      }}
    >
      <span className="select-none px-3 py-2 text-center">{element.label}</span>
    </div>
  );
}
