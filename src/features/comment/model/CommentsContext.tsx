import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { commentService, type CommentThread } from '@/entities/comment';

import { CommentFilterValues } from './types';

type CommentsContextValue = {
  readonly commentThreads: ReadonlyArray<CommentThread>;
  readonly isLoading: boolean;
  readonly filter: `${CommentFilterValues}`;
  readonly setFilter: (filter: CommentFilterValues) => void;
};

const CommentsContext = createContext<CommentsContextValue | undefined>(undefined);

export function CommentsProvider({ children }: {
  readonly children: ReactNode;
}): ReactNode {
  const [commentThreads, setCommentsThreads] = useState<ReadonlyArray<CommentThread>>([]);
  const [filter, setFilter] = useState<`${CommentFilterValues}`>(CommentFilterValues.Open);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    commentService.getAll().then((data) => {
      if (!cancelled) {
        setCommentsThreads(data);
        setIsLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, []);

  return (
    <CommentsContext.Provider value={{ commentThreads, isLoading, filter, setFilter }}>
      {children}
    </CommentsContext.Provider>
  );
}

export function useComments(): CommentsContextValue {
  const commentsContext = useContext(CommentsContext);

  if (!commentsContext) {
    throw new Error('useUI must be used within UIProvider');
  }

  return commentsContext;
}
