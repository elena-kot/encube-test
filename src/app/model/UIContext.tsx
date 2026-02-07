import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

type UIContextValue = {
  readonly isCommentsPanelOpen: boolean;
  readonly setCommentsPanelOpen: (isOpen: boolean) => void;
};

const UIContext = createContext<UIContextValue | undefined>(undefined);

export function UIProvider({ children }: {
  readonly children: ReactNode;
}): ReactNode {
  const [isCommentsPanelOpen, setCommentsPanelOpen] = useState(false);

  return (
    <UIContext.Provider value={{
      isCommentsPanelOpen,
      setCommentsPanelOpen,
    }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI(): UIContextValue {
  const uiContext = useContext(UIContext);

  if (!uiContext) {
    throw new Error('useUI must be used within UIProvider');
  }

  return uiContext;
}
