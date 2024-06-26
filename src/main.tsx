import './globals.css';

import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { SettingsOverlay } from '@/components/settings/settings-overlay.tsx';
import { queryClient } from '@/config/query-client.ts';
import { SettingsProvider } from '@/contexts/settings.context.tsx';

import { App } from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <App />
        <SettingsOverlay />
      </SettingsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
