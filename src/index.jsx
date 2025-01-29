import React from 'react';
import ReactDOM from 'react-dom';

import { Analytics } from "@vercel/analytics/react"

import App from './App';
import Maintenance from './Maintenance';

const maintenanceMode = false;

ReactDOM.render(
  <React.StrictMode>
    {maintenanceMode ? <Maintenance /> : <App />}
    <Analytics />
  </React.StrictMode>,
  document.getElementById('root'),
);
