import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/shared/styles/index.css';
import { App } from '@/app/App';

async function enableMocking(): Promise<void> {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const { worker } = await import('@/mocks/browser');

  await worker.start({ onUnhandledRequest: 'bypass' });
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

enableMocking().then(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
