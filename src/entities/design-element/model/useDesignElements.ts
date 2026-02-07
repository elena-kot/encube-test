import { useEffect, useState } from 'react';

import { designElementService } from '../api/service';

import type { DesignElement } from './types';

type UseDesignElementsResult = {
  readonly elements: ReadonlyArray<DesignElement>;
  readonly isLoading: boolean;
};

export function useDesignElements(): UseDesignElementsResult {
  const [elements, setElements] = useState<ReadonlyArray<DesignElement>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    designElementService.getAll().then((data) => {
      if (!cancelled) {
        setElements(data);
        setIsLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, []);

  return { elements, isLoading };
}
