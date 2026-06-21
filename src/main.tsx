import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';

import { BrowserRouter } from 'react-router-dom';

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert" className="p-8 bg-[#050505] text-red-500 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <pre className="text-sm bg-black/50 p-4 rounded overflow-auto max-w-full">
        {error.message}
      </pre>
      <button onClick={resetErrorBoundary} className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200">
        Try again
      </button>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
