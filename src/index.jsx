import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import Maintenance from './Maintenance';

import Providers from './Providers';

const maintenanceMode = false;

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Providers>{maintenanceMode ? <Maintenance /> : <App />}</Providers>
  </React.StrictMode>
);
